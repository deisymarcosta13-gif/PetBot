from pydantic import BaseModel

class AppointmentCreate(BaseModel):
    date: str
    time: str
    reason: str
    pet_id: int