import re
from typing import Dict

# Common skills database
TECHNICAL_SKILLS = [
    "python", "java", "javascript", "typescript", "c++", "c#", "sql",
    "machine learning", "deep learning", "nlp", "computer vision",
    "react", "nextjs", "nodejs", "fastapi", "django", "flask",
    "docker", "kubernetes", "aws", "azure", "gcp",
    "postgresql", "mongodb", "mysql", "redis",
    "git", "github", "linux", "data structures", "algorithms",
    "tensorflow", "pytorch", "scikit-learn", "pandas", "numpy",
    "power bi", "tableau", "excel", "data analysis"
]

SOFT_SKILLS = [
    "leadership", "communication", "teamwork", "problem solving",
    "critical thinking", "time management", "project management"
]

def analyze_resume(text: str, branch: str = "CSE") -> Dict:
    """Resume text analyze karo"""
    text_lower = text.lower()
    
    # Skills detect karo
    found_technical = [s for s in TECHNICAL_SKILLS if s in text_lower]
    found_soft = [s for s in SOFT_SKILLS if s in text_lower]
    
    # Score calculate karo
    tech_score = min(len(found_technical) * 8, 60)
    soft_score = min(len(found_soft) * 5, 20)
    
    # Experience check
    has_experience = any(w in text_lower for w in ["internship", "experience", "worked", "project"])
    exp_score = 15 if has_experience else 0
    
    # Education check
    has_education = any(w in text_lower for w in ["b.tech", "btech", "bachelor", "engineering", "university", "college"])
    edu_score = 5 if has_education else 0
    
    total_score = tech_score + soft_score + exp_score + edu_score
    total_score = min(total_score, 100)
    
    # Grade
    if total_score >= 80:
        grade = "Excellent"
        message = "Strong resume! Ready for top companies."
    elif total_score >= 60:
        grade = "Good"
        message = "Good resume. Add more technical skills."
    elif total_score >= 40:
        grade = "Average"
        message = "Needs improvement. Add projects and skills."
    else:
        grade = "Poor"
        message = "Significant improvements needed."

    # Branch ke hisaab se missing skills
    branch_required = {
        "CSE": ["python", "data structures", "algorithms", "sql", "git"],
        "AIML": ["python", "machine learning", "deep learning", "tensorflow", "pandas"],
        "ECE": ["c++", "python", "linux", "git"],
        "ME": ["python", "excel", "autocad"],
        "CE": ["python", "excel", "project management"],
    }
    
    required = branch_required.get(branch, ["python", "git", "sql"])
    missing = [s for s in required if s not in found_technical]

    return {
        "resume_score": total_score,
        "grade": grade,
        "message": message,
        "technical_skills_found": found_technical,
        "soft_skills_found": found_soft,
        "missing_skills": missing,
        "has_experience": has_experience,
        "recommendation": f"Add these skills to improve: {', '.join(missing[:3])}" if missing else "Great skill set!"
    }