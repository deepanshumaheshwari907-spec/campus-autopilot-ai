from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.models.student import Student
from app.models.schemas import StudentCreate, StudentResponse, StudentUpdate

router = APIRouter(prefix="/students", tags=["Students"])

# Sabhi students laao
@router.get("/", response_model=List[StudentResponse])
def get_all_students(db: Session = Depends(get_db)):
    students = db.query(Student).all()
    return students

# Ek student laao
@router.get("/{student_id}", response_model=StudentResponse)
def get_student(student_id: int, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Student not found"
        )
    return student

# Naya student add karo
@router.post("/", response_model=StudentResponse)
def create_student(student_data: StudentCreate, db: Session = Depends(get_db)):
    existing = db.query(Student).filter(
        Student.roll_number == student_data.roll_number
    ).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Roll number already exists"
        )
    new_student = Student(**student_data.dict())
    db.add(new_student)
    db.commit()
    db.refresh(new_student)
    return new_student

# Student update karo
@router.put("/{student_id}", response_model=StudentResponse)
def update_student(student_id: int, student_data: StudentUpdate, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Student not found"
        )
    for key, value in student_data.dict(exclude_unset=True).items():
        setattr(student, key, value)
    db.commit()
    db.refresh(student)
    return student

# Student delete karo
@router.delete("/{student_id}")
def delete_student(student_id: int, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Student not found"
        )
    db.delete(student)
    db.commit()
    return {"message": "Student deleted successfully"}