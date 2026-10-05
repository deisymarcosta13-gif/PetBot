from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from fastapi.responses import JSONResponse

from app.database.database import get_db
from app.models.pet_model import Pet
from app.schemas.pet_schema import PetCreate

from app.dependencies.auth import get_current_user_db
from app.models.user_model import User

from app.models.appointments_model import Appointment
from app.models.medication_model import Medication

from fastapi import UploadFile, File
import os
import shutil

router = APIRouter(prefix="/pets", tags=["Pets"])


@router.post("/create_pet")
async def create_pet(
    pet: PetCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user_db)
):

    try:
        new_pet = Pet(
            name=pet.name,
            type=pet.type,
            breed=pet.breed,
            user_id=current_user.id   
        )

        db.add(new_pet)
        db.commit()
        db.refresh(new_pet)

        return JSONResponse(
            status_code=status.HTTP_201_CREATED,
            content={
                "status": 201,
                "message": "Mascota creada exitosamente",
                "pet_id": new_pet.id,
                "user_id": current_user.id
            }
        )

    except Exception as e:
        print("ERROR create_pet:", e)
        db.rollback()

        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "status": 500,
                "message": "Error al crear la mascota"
            }
        )
        
@router.get("/list_user_pets")
async def get_pets(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user_db)
):

    try:

        pets = db.query(Pet).filter(
            Pet.user_id == current_user.id
        ).all()

        if not pets:
            return JSONResponse(
                status_code=status.HTTP_200_OK,
                content={
                    "status": 200,
                    "message": "No se encontraron mascotas para este usuario",
                    "pets": []
                }
            )

        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={
                "status": 200,
                "pets": [
                    {
                        "id": pet.id,
                        "name": pet.name,
                        "type": pet.type,
                        "breed": pet.breed,
                        "image_url": pet.image_url
                    }
                    for pet in pets
                ]
            }
        )

    except Exception as e:
        print("ERROR get_pets:", e)
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "status": 500,
                "message": "Error al obtener las mascotas"
            }
        )

@router.put("/update_pet/{id}")
async def update_pet(
    id: int,
    pet_data: PetCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user_db)
):
    try:

        pet = db.query(Pet).filter(
            Pet.id == id,
            Pet.user_id == current_user.id
        ).first()

        if not pet:
            return JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND,
                content={
                    "status": 404,
                    "message": "Mascota no encontrada"
                }
            )

        if not pet_data.name.strip():
            return JSONResponse(
                status_code=400,
                content={
                    "status": 400,
                    "message": "El nombre es obligatorio"
                }
            )

        if not pet_data.type.strip():
            return JSONResponse(
                status_code=400,
                content={
                    "status": 400,
                    "message": "El tipo es obligatorio"
                }
            )

        if not (pet_data.breed or "").strip():
            return JSONResponse(
                status_code=400,
                content={
                    "status": 400,
                    "message": "La raza es obligatoria"
                }
            )

        if (
            pet.name == pet_data.name and
            pet.type == pet_data.type and
            pet.breed == pet_data.breed
        ):
            return JSONResponse(
                status_code=status.HTTP_200_OK,
                content={
                    "status": 200,
                    "message": "No hubo cambios para actualizar",
                    "pet": {
                        "id": pet.id,
                        "name": pet.name,
                        "type": pet.type,
                        "breed": pet.breed
                    }
                }
            )

        pet.name = pet_data.name
        pet.type = pet_data.type
        pet.breed = pet_data.breed

        db.commit()
        db.refresh(pet)

        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={
                "status": 200,
                "message": "Mascota actualizada correctamente",
                "pet": {
                    "id": pet.id,
                    "name": pet.name,
                    "type": pet.type,
                    "breed": pet.breed
                }
            }
        )

    except Exception as e:
        print("ERROR update_pet:", e)
        db.rollback()

        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "status": 500,
                "message": "Error al actualizar la mascota"
            }
        )

@router.put("/update_pet_image/{id}/image")
async def update_pet_image(
    id: int,
    image: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user_db)
):
    try:

        pet = db.query(Pet).filter(
            Pet.id == id,
            Pet.user_id == current_user.id
        ).first()

        if not pet:
            return JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND,
                content={
                    "status": 404,
                    "message": "Mascota no encontrada"
                }
            )

        # Validar imagen
        if not image.content_type.startswith("image/"):
            return JSONResponse(
                status_code=status.HTTP_400_BAD_REQUEST,
                content={
                    "status": 400,
                    "message": "El archivo debe ser una imagen"
                }
            )

        # Obtener extensión
        extension = image.filename.split(".")[-1]

        # Nombre único
        filename = f"pet_{pet.id}.{extension}"

        # Ruta física
        file_path = os.path.join(
            "uploads",
            "pets",
            filename
        )

        # Guardar archivo
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(
                image.file,
                buffer
            )

        # Guardar ruta en BD (siempre con "/" para usarla en URLs)
        pet.image_url = f"uploads/pets/{filename}"

        db.commit()
        db.refresh(pet)

        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={
                "status": 200,
                "message": "Imagen actualizada correctamente",
                "image_url": pet.image_url
            }
        )

    except Exception as e:
        print("ERROR update_pet_image:", e)

        db.rollback()

        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "status": 500,
                "message": "Error al actualizar la imagen"
            }
        )


@router.delete("/delete_pet/{id}")
async def delete_pet(
    id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user_db)
):
    try:

        pet = db.query(Pet).filter(
            Pet.id == id,
            Pet.user_id == current_user.id
        ).first()

        if not pet:
            return JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND,
                content={
                    "status": 404,
                    "message": "Mascota no encontrada"
                }
            )
        # Eliminar citas asociadas
        db.query(Appointment).filter(
            Appointment.pet_id == pet.id
        ).delete()

        # Eliminar medicamentos asociados
        db.query(Medication).filter(
            Medication.pet_id == pet.id
        ).delete()

        # Eliminar mascota
        db.delete(pet)

        db.commit()

        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={
                "status": 200,
                "message": "Mascota eliminada correctamente",
                "pet_id": id
            }
        )

    except Exception as e:
        print("ERROR delete_pet:", e)

        db.rollback()

        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "status": 500,
                "message": "Error al eliminar la mascota"
            }
        )