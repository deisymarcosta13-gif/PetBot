from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.dependencies.auth import get_current_user_db

from app.models.user_model import User

from app.chatbot.chat_service import process_message

router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)


class ChatRequest(BaseModel):
    message: str


@router.post("/message")
async def chat_message(
    data: ChatRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user_db)
):

    return process_message(
        data.message,
        db,
        current_user
    )