from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.database.database import Base

class Medication(Base):
    __tablename__ = "medications"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(100), nullable=False)
    dosage = Column(String(50), nullable=False)
    frequency = Column(String(100), nullable=False)

    pet_id = Column(Integer, ForeignKey("pets.id"))
    user_id = Column(Integer, ForeignKey("users.id"))

    pet = relationship("Pet")
    user = relationship("User")