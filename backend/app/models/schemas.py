from pydantic import BaseModel, EmailStr
from typing import Optional

# Register ke liye
class UserCreate(BaseModel):
    email: EmailStr
    full_name: str
    password: str
    college_name: Optional[str] = None

# Login ke liye
class UserLogin(BaseModel):
    email: EmailStr
    password: str

# Response ke liye
class UserResponse(BaseModel):
    id: int
    email: str
    full_name: str
    college_name: Optional[str]
    is_active: bool
    is_admin: bool

    class Config:
        from_attributes = True

# Token ke liye
class Token(BaseModel):
    access_token: str
    token_type: str


# Student ke liye
class StudentCreate(BaseModel):
    roll_number: str
    full_name: str
    email: str
    branch: str
    year: int
    attendance_percentage: float = 0.0
    cgpa: float = 0.0
    backlogs: int = 0
    is_placement_eligible: bool = False

class StudentResponse(BaseModel):
    id: int
    roll_number: str
    full_name: str
    email: str
    branch: str
    year: int
    attendance_percentage: float
    cgpa: float
    backlogs: int
    is_placement_eligible: bool

    class Config:
        from_attributes = True

class StudentUpdate(BaseModel):
    full_name: Optional[str] = None
    attendance_percentage: Optional[float] = None
    cgpa: Optional[float] = None
    backlogs: Optional[int] = None
    is_placement_eligible: Optional[bool] = None