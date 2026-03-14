from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.db.database import Base

class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    roll_number = Column(String, unique=True, index=True, nullable=False)
    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    branch = Column(String, nullable=False)
    year = Column(Integer, nullable=False)
    attendance_percentage = Column(Float, default=0.0)
    cgpa = Column(Float, default=0.0)
    backlogs = Column(Integer, default=0)
    is_placement_eligible = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())