from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.student import Student
from app.services.digital_twin import generate_digital_twin

router = APIRouter(prefix="/digital-twin", tags=["Student Digital Twin"])

@router.get("/{student_id}")
def get_digital_twin(student_id: int, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    student_dict = {
        "full_name": student.full_name,
        "branch": student.branch,
        "cgpa": student.cgpa,
        "attendance_percentage": student.attendance_percentage,
        "backlogs": student.backlogs,
        "is_placement_eligible": student.is_placement_eligible
    }

    twin = generate_digital_twin(student_dict)
    return twin