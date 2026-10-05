from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.database.database import Base

class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(Integer, primary_key=True, index=True)

    date = Column(String(20), nullable=False)
    time = Column(String(20), nullable=False)
    reason = Column(String(255), nullable=False)

    pet_id = Column(Integer, ForeignKey("pets.id"))
    user_id = Column(Integer, ForeignKey("users.id"))

    pet = relationship("Pet")
    user = relationship("User")