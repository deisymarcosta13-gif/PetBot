import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.config.settings import CORS_ORIGINS
from app.database.database import engine, Base
from app.models.user_model import User

from app.routes.auth_routes import router as auth_router
from app.routes.pet_routes import router as pet_router
from app.routes.medication_routes import router as medication_router
from app.routes.appointment_routes import router as appointment_router
from app.routes.chat import router as chat_router
from app.routes.ai_routes import router as ai_router

app = FastAPI()

# La carpeta de imágenes debe existir antes de montarla
os.makedirs(os.path.join("uploads", "pets"), exist_ok=True)

app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(auth_router)
app.include_router(pet_router)
app.include_router(medication_router)
app.include_router(appointment_router)
app.include_router(chat_router)
app.include_router(ai_router)


@app.get("/")
def home():
    return {
        "message": "PetBot API"
    }