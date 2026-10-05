from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from fastapi.responses import JSONResponse
from datetime import datetime

from app.database.database import get_db

from app.models.appointments_model import Appointment
from app.models.pet_model import Pet
from app.models.user_model import User

from app.schemas.appointment_schema import AppointmentCreate

from app.dependencies.auth import get_current_user_db

router = APIRouter(prefix="/appointments", tags=["Appointments"])

@router.post("/create_appointment")
async def create_appointment(
    appointment: AppointmentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user_db)
):
    try:

        pet = db.query(Pet).filter(
            Pet.id == appointment.pet_id,
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
            
        try:
            appointment_date = datetime.strptime(
                appointment.date, "%Y-%m-%d"
            ).date()

            today = datetime.now().date()

            if appointment_date < today:
                return JSONResponse(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    content={
                        "status": 400,
                        "message": "No puedes agendar citas en una fecha pasada"
                    }
                )

        except ValueError:
            return JSONResponse(
                status_code=status.HTTP_400_BAD_REQUEST,
                content={
                    "status": 400,
                    "message": "Formato de fecha inválido. Usa YYYY-MM-DD"
                }
            )

        
        new_appointment = Appointment(
            date=appointment.date,
            time=appointment.time,
            reason=appointment.reason,
            pet_id=appointment.pet_id,
            user_id=current_user.id
        )

        db.add(new_appointment)
        db.commit()
        db.refresh(new_appointment)

        return JSONResponse(
            status_code=status.HTTP_201_CREATED,
            content={
                "status": 201,
                "message": "Cita creada exitosamente",
                "appointment_id": new_appointment.id,
                "pet_id": appointment.pet_id
            }
        )

    except Exception as e:
        print("ERROR create_appointment:", e)
        db.rollback()

        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "status": 500,
                "message": "Error al crear la cita"
            }
        )
        
@router.get("/list_user_appointments")
async def get_appointments(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user_db)
):

    try:

        appointments = db.query(Appointment).filter(
            Appointment.user_id == current_user.id
        ).all()

        if not appointments:
            return JSONResponse(
                status_code=status.HTTP_200_OK,
                content={
                    "status": 200,
                    "message": "No se encontraron citas para este usuario",
                    "appointments": []
                }
            )

        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={
                "status": 200,
                "appointments": [
                    {
                        "id": appt.id,
                        "date": appt.date,
                        "time": appt.time,
                        "reason": appt.reason,
                        "pet_id": appt.pet_id,
                        "pet_name": appt.pet.name
                    }
                    for appt in appointments
                ]
            }
        )

    except Exception as e:
        print("ERROR get_appointments:", e)
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "status": 500,
                "message": "Error al obtener las citas"
            }
        )


@router.put("/update_appointment/{id}")
async def update_appointment(
    id: int,
    appointment_data: AppointmentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user_db)
):
    try:

        # 1. Validar que la cita exista y sea del usuario
        appointment = db.query(Appointment).filter(
            Appointment.id == id,
            Appointment.user_id == current_user.id
        ).first()

        if not appointment:
            return JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND,
                content={
                    "status": 404,
                    "message": "Cita no encontrada"
                }
            )
            
        pet = db.query(Pet).filter(
            Pet.id == appointment_data.pet_id,
            Pet.user_id == current_user.id
        ).first()

        if not pet:
            return JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND,
                content={
                    "status": 404,
                    "message": "Mascota no válida"
                }
            )

        # 3. Validación de campos vacíos
        if not appointment_data.date.strip():
            return JSONResponse(status_code=400, content={"message": "La fecha no puede estar vacía"})

        if not appointment_data.time.strip():
            return JSONResponse(status_code=400, content={"message": "La hora no puede estar vacía"})

        if not appointment_data.reason.strip():
            return JSONResponse(status_code=400, content={"message": "La razón no puede estar vacía"})

        # 4. Actualizar campos
        appointment.date = appointment_data.date
        appointment.time = appointment_data.time
        appointment.reason = appointment_data.reason
        appointment.pet_id = appointment_data.pet_id

        db.commit()
        db.refresh(appointment)

        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={
                "status": 200,
                "message": "Cita actualizada correctamente",
                "appointment": {
                    "id": appointment.id,
                    "date": appointment.date,
                    "time": appointment.time,
                    "reason": appointment.reason,
                    "pet_id": appointment.pet_id
                }
            }
        )

    except Exception as e:
        print("ERROR update_appointment:", e)
        db.rollback()
        return JSONResponse(
            status_code=500,
            content={
                "status": 500,
                "message": "Error al actualizar la cita"
            }
        )

@router.delete("/delete_appointment/{id}")
async def delete_appointment(
    id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user_db)
):
    try:

        # Buscar cita del usuario
        appointment = db.query(Appointment).filter(
            Appointment.id == id,
            Appointment.user_id == current_user.id
        ).first()

        if not appointment:
            return JSONResponse(
                status_code=404,
                content={
                    "status": 404,
                    "message": "Cita no encontrada"
                }
            )

        db.delete(appointment)
        db.commit()

        return JSONResponse(
            status_code=200,
            content={
                "status": 200,
                "message": "Cita eliminada correctamente",
                "deleted_id": id
            }
        )

    except Exception as e:
        print("ERROR delete_appointment:", e)
        db.rollback()
        return JSONResponse(
            status_code=500,
            content={
                "status": 500,
                "message": "Error al eliminar la cita"
            }
        )