from pydantic import BaseModel

class MedicationCreate(BaseModel):
    name: str
    dosage: str
    frequency: str
    pet_id: int