def generate_digital_twin(student: dict) -> dict:
    """
    Student data se AI Digital Twin generate karo
    """
    name = student.get("full_name")
    branch = student.get("branch")
    cgpa = student.get("cgpa", 0)
    attendance = student.get("attendance_percentage", 0)
    backlogs = student.get("backlogs", 0)
    placement_eligible = student.get("is_placement_eligible", False)

    # Skills suggest karo branch ke basis pe
    branch_skills = {
        "CSE": ["Python", "Data Structures", "Algorithms", "Web Development"],
        "AIML": ["Python", "Machine Learning", "Deep Learning", "NLP"],
        "ECE": ["Embedded Systems", "VLSI", "Signal Processing", "IoT"],
        "ME": ["CAD", "Thermodynamics", "Manufacturing", "AutoCAD"],
        "CE": ["Structural Analysis", "AutoCAD", "Project Management"],
    }
    skills = branch_skills.get(branch, ["Communication", "Problem Solving"])

    # Weaknesses detect karo
    weaknesses = []
    if attendance < 75:
        weaknesses.append("Attendance — needs improvement")
    if cgpa < 6.5:
        weaknesses.append("Academic performance — needs improvement")
    if backlogs > 0:
        weaknesses.append(f"Clear {backlogs} pending backlog(s)")
    if not weaknesses:
        weaknesses.append("Keep maintaining consistency!")

    # Placement readiness
    if cgpa >= 7.5 and attendance >= 75 and backlogs == 0:
        readiness = "HIGH"
        readiness_msg = "Ready for top companies!"
    elif cgpa >= 6.5 and attendance >= 65:
        readiness = "MEDIUM"
        readiness_msg = "Needs minor improvements before placements"
    else:
        readiness = "LOW"
        readiness_msg = "Focus on academics and attendance first"

    # Career path suggest karo
    career_paths = {
        "CSE": ["Software Engineer", "Full Stack Developer", "DevOps Engineer"],
        "AIML": ["ML Engineer", "Data Scientist", "AI Researcher", "NLP Engineer"],
        "ECE": ["Embedded Engineer", "IoT Developer", "VLSI Designer"],
        "ME": ["Design Engineer", "Production Manager", "R&D Engineer"],
        "CE": ["Site Engineer", "Structural Engineer", "Project Manager"],
    }
    careers = career_paths.get(branch, ["Consultant", "Analyst"])

    # Companies suggest karo
    if cgpa >= 8.0:
        companies = ["Google", "Microsoft", "Amazon", "Meta", "Apple"]
    elif cgpa >= 7.0:
        companies = ["Infosys", "TCS", "Wipro", "Accenture", "Capgemini"]
    else:
        companies = ["Startups", "SMEs", "Government Sector", "Freelancing"]

    return {
        "student_name": name,
        "branch": branch,
        "cgpa": cgpa,
        "attendance": attendance,
        "skills": skills,
        "weaknesses": weaknesses,
        "placement_readiness": readiness,
        "readiness_message": readiness_msg,
        "suggested_career_paths": careers,
        "target_companies": companies,
        "learning_recommendation": f"Focus on {skills[0]} and {skills[1]} to strengthen your profile."
    }