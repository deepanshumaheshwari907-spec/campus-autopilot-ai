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