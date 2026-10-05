from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.ai.gemini import ask_gemini

from app.database.database import get_db
from app.dependencies.auth import get_current_user_db

from app.models.user_model import User

router = APIRouter(
    prefix="/ia",
    tags=["IA"]
)


class MessageRequest(BaseModel):
    message: str


@router.post("/ask")
def ask_ia(
    data: MessageRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user_db)
):

    try:

        user_message = data.message.strip()

        if not user_message:
            return {
                "ok": False,
                "response": "El mensaje está vacío"
            }

        response = ask_gemini(user_message)

        return {
            "ok": True,
            "response": response
        }

    except Exception as e:

        print("ERROR IA:", type(e).__name__)

        return {
            "ok": False,
            "response": "Error consultando IA"
        }