# app/schemas.py
from pydantic import BaseModel
from datetime import date, datetime
from typing import Optional

class UserCreate(BaseModel):
    username: str
    password: str
    birthday: Optional[date] = None

class UserUpdate(BaseModel):
    password: Optional[str] = None
    birthday: Optional[date] = None

class UserOut(BaseModel):
    username: str
    birthday: Optional[date]
    create_time: datetime
    last_login: Optional[datetime]

    class Config:
        from_attributes = True