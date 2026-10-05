from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session
from fastapi.responses import JSONResponse
from fastapi import status

from app.database.database import get_db
from app.schemas.user_schema import UserCreate, UserLogin
from app.models.user_model import User

from app.core.security import (
    hash_password,
    verify_password,
    create_token,
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

@router.post("/register")
async def register(user: UserCreate, db: Session = Depends(get_db)):
    
    try:
        email = user.email.strip().lower()

        exist = db.query(User).filter(
            User.email == email
        ).first()

        if exist:

            return JSONResponse(
                status_code=status.HTTP_400_BAD_REQUEST,
                content={
                    "status": 400,
                    "message": "Email ya registrado"
                }
            )

        new_user = User(
            name=user.name,
            email=email,
            password=hash_password(user.password)
        )
        
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        
        return JSONResponse(
            status_code=status.HTTP_201_CREATED,
            content={
                "status": 201,
                "message": "Usuario registrado exitosamente",
                "user_id": new_user.id
            }
        )
        
    except Exception as e:
        
        db.rollback()#

        print("ERROR REGISTER:", e)

        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "status": 500,
                "message": "Error interno del servidor"
            }
        )
        
        
@router.post("/login")
async def login(
    user: UserLogin,
    db: Session = Depends(get_db)
):

    try:

        email = user.email.strip().lower()

        exist = db.query(User).filter(
            User.email == email
        ).first()

        if not exist:
            return JSONResponse(
                status_code=status.HTTP_401_UNAUTHORIZED,
                content={
                    "status": 401,
                    "message": "Correo o contraseña incorrectos"
                }
            )

        if not verify_password(
            user.password,
            exist.password
        ):
            return JSONResponse(
                status_code=status.HTTP_401_UNAUTHORIZED,
                content={
                    "status": 401,
                    "message": "Correo o contraseña incorrectos"
                }
            )

        token = create_token({
            "sub": exist.email
        })

        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={
                "status": 200,
                "message": "Login exitoso",
                "token": token
            }
        )

    except Exception as e:

        print("ERROR LOGIN:", e)

        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "status": 500,
                "message": "Error interno del servidor"
            }
        )