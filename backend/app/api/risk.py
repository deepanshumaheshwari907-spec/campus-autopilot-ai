from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.models.student import Student
from app.services.risk_detector import calculate_risk_score, analyze_batch_risk

router = APIRouter(prefix="/risk", tags=["Risk Detection"])

# Ek student ka risk analyze karo
@router.get("/{student_id}")
def get_student_risk(student_id: int, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    risk = calculate_risk_score(
        attendance=student.attendance_percentage,
        cgpa=student.cgpa,
        backlogs=student.backlogs
    )

    return {
        "student_id": student.id,
        "roll_number": student.roll_number,
        "full_name": student.full_name,
        "branch": student.branch,
        "year": student.year,
        "attendance_percentage": student.attendance_percentage,
        "cgpa": student.cgpa,
        "backlogs": student.backlogs,
        **risk
    }

# Sabhi students ka risk analyze karo
@router.get("/")
def get_all_risk(db: Session = Depends(get_db)):
    students = db.query(Student).all()
    if not students:
        return {"message": "No students found", "data": []}

    students_list = [
        {
            "id": s.id,
            "roll_number": s.roll_number,
            "full_name": s.full_name,
            "attendance_percentage": s.attendance_percentage,
            "cgpa": s.cgpa,
            "backlogs": s.backlogs
        }
        for s in students
    ]

    results = analyze_batch_risk(students_list)
    
    return {
        "total_students": len(results),
        "high_risk": len([r for r in results if r["risk_level"] == "HIGH"]),
        "medium_risk": len([r for r in results if r["risk_level"] == "MEDIUM"]),
        "low_risk": len([r for r in results if r["risk_level"] == "LOW"]),
        "data": results
    }