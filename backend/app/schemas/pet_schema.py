from pydantic import BaseModel

class PetCreate(BaseModel):
    name: str
    type: str
    breed: str | None = None