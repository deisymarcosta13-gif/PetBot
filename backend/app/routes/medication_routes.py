from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from fastapi.responses import JSONResponse

from app.database.database import get_db

from app.models.medication_model import Medication
from app.models.pet_model import Pet
from app.models.user_model import User

from app.schemas.medication_schema import MedicationCreate

from app.dependencies.auth import get_current_user_db

router = APIRouter(prefix="/medications", tags=["Medications"])

@router.post("/create_medication")
async def create_medication(
    medication: MedicationCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user_db)
):

    try:
        pet = db.query(Pet).filter(
            Pet.id == medication.pet_id,
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

        new_medication = Medication(
            name=medication.name,
            dosage=medication.dosage,
            frequency=medication.frequency,
            pet_id=medication.pet_id,
            user_id=current_user.id
        )

        db.add(new_medication)
        db.commit()
        db.refresh(new_medication)

        return JSONResponse(
            status_code=status.HTTP_201_CREATED,
            content={
                "status": 201,
                "message": "Medicación creada exitosamente",
                "medication_id": new_medication.id,
                "pet_id": medication.pet_id
            }
        )

    except Exception as e:
        print("ERROR create_medication:", e)
        db.rollback()

        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "status": 500,
                "message": "Error al crear la medicación"
            }
        )
        
@router.get("/list_user_medications")
async def get_medications(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user_db)
):

    try:

        medications = db.query(Medication).filter(
            Medication.user_id == current_user.id
        ).all()

        if not medications:
            return JSONResponse(
                status_code=status.HTTP_200_OK,
                content={
                    "status": 200,
                    "message": "No se encontraron medicamentos para este usuario",
                    "medications": []
                }
            )

        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={
                "status": 200,
                "medications": [
                    {
                        "id": medication.id,
                        "name": medication.name,
                        "dosage": medication.dosage,
                        "frequency": medication.frequency,
                        "pet_id": medication.pet_id,
                        "pet_name": medication.pet.name
                    }
                    for medication in medications
                ]
            }
        )

    except Exception as e:
        print("ERROR get_medications:", e)
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "status": 500,
                "message": "Error al obtener las medicaciones"
            }
        )


@router.put("/update_medication/{id}")
async def update_medication(
    id: int,
    medication_data: MedicationCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user_db)
):
    try:

        medication = db.query(Medication).filter(
            Medication.id == id,
            Medication.user_id == current_user.id
        ).first()

        if not medication:
            return JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND,
                content={
                    "status": 404,
                    "message": "Medicamento no encontrado"
                }
            )

        medication.name = medication_data.name
        medication.dosage = medication_data.dosage
        medication.frequency = medication_data.frequency

        db.commit()
        db.refresh(medication)

        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={
                "status": 200,
                "message": "Medicamento actualizado correctamente",
                "medication": {
                    "id": medication.id,
                    "name": medication.name,
                    "dosage": medication.dosage,
                    "frequency": medication.frequency,
                    "pet_id": medication.pet_id
                }
            }
        )

    except Exception as e:
        print("ERROR update_medication:", e)
        db.rollback()
        return JSONResponse(
            status_code=500,
            content={
                "status": 500,
                "message": "Error al actualizar medicamento"
            }
        )


@router.delete("/delete_medication/{id}")
async def delete_medication(
    id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user_db)
):
    try:

        medication = db.query(Medication).filter(
            Medication.id == id,
            Medication.user_id == current_user.id
        ).first()

        if not medication:
            return JSONResponse(
                status_code=404,
                content={
                    "status": 404,
                    "message": "Medicamento no encontrado"
                }
            )

        db.delete(medication)
        db.commit()

        return JSONResponse(
            status_code=200,
            content={
                "status": 200,
                "message": "Medicamento eliminado correctamente",
                "deleted_id": id
            }
        )

    except Exception as e:
        print("ERROR delete_medication:", e)
        db.rollback()
        return JSONResponse(
            status_code=500,
            content={
                "status": 500,
                "message": "Error al eliminar medicamento"
            }
        )