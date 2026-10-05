from dotenv import load_dotenv
from pathlib import Path
import os

env_path = Path(__file__).resolve().parents[2] / ".env"

load_dotenv(dotenv_path=env_path)

DATABASE_URL = os.getenv("DATABASE_URL")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Orígenes permitidos por CORS, separados por comas
CORS_ORIGINS = [
    origin.strip()
    for origin in os.getenv(
        "CORS_ORIGINS",
        "http://localhost:5173,http://127.0.0.1:5173"
    ).split(",")
    if origin.strip()
]
