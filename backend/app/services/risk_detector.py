import pandas as pd
import numpy as np
from typing import List, Dict

def calculate_risk_score(
    attendance: float,
    cgpa: float,
    backlogs: int
) -> Dict:
    """
    Student ka risk score calculate karo
    Returns: risk_score, risk_level, reasons
    """
    score = 0
    reasons = []

    # Attendance check
    if attendance < 60:
        score += 40
        reasons.append(f"Critical attendance: {attendance}%")
    elif attendance < 75:
        score += 25
        reasons.append(f"Low attendance: {attendance}%")
    elif attendance < 85:
        score += 10
        reasons.append(f"Average attendance: {attendance}%")

    # CGPA check
    if cgpa < 5.0:
        score += 40
        reasons.append(f"Critical CGPA: {cgpa}")
    elif cgpa < 6.5:
        score += 25
        reasons.append(f"Low CGPA: {cgpa}")
    elif cgpa < 7.5:
        score += 10
        reasons.append(f"Average CGPA: {cgpa}")

    # Backlogs check
    if backlogs >= 3:
        score += 20
        reasons.append(f"Multiple backlogs: {backlogs}")
    elif backlogs == 2:
        score += 15
        reasons.append(f"2 backlogs")
    elif backlogs == 1:
        score += 8
        reasons.append(f"1 backlog")

    # Risk level decide karo
    if score >= 60:
        risk_level = "HIGH"
        recommendation = "Immediate counselling required. Alert faculty mentor."
    elif score >= 30:
        risk_level = "MEDIUM"
        recommendation = "Monitor closely. Schedule mentorship session."
    else:
        risk_level = "LOW"
        recommendation = "Student is performing well. Keep encouraging."

    return {
        "risk_score": min(score, 100),
        "risk_level": risk_level,
        "reasons": reasons,
        "recommendation": recommendation
    }


def analyze_batch_risk(students: List[Dict]) -> List[Dict]:
    """
    Multiple students ka risk ek saath analyze karo
    """
    results = []
    for student in students:
        risk = calculate_risk_score(
            attendance=student.get("attendance_percentage", 0),
            cgpa=student.get("cgpa", 0),
            backlogs=student.get("backlogs", 0)
        )
        results.append({
            "student_id": student.get("id"),
            "roll_number": student.get("roll_number"),
            "full_name": student.get("full_name"),
            "attendance_percentage": student.get("attendance_percentage"),
            "cgpa": student.get("cgpa"),
            "backlogs": student.get("backlogs"),
            **risk
        })

    # High risk pehle dikhao
    results.sort(key=lambda x: x["risk_score"], reverse=True)
    return results