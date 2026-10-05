from sqlalchemy import Column, Integer, String, ForeignKey
from app.database.database import Base

class Pet(Base):
    __tablename__ = "pets"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(100), nullable=False)
    type = Column(String(50), nullable=False)
    breed = Column(String(100), nullable=True)

    image_url = Column(String(500), nullable=True)

    user_id = Column(Integer, ForeignKey("users.id"))