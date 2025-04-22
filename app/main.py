from fastapi import FastAPI, Depends, HTTPException, Query, Form
from sqlalchemy.orm import Session
from app.auth import verify_password, create_access_token
from app.Models.userORM import User
from app.db import get_db
from pydantic import BaseModel
from datetime import datetime, timezone
from fastapi.security import OAuth2PasswordRequestForm
from app.auth import get_current_user
from app.Models.users import UserCreate, UserUpdate, UserOut
import hashlib
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LoginRequest(BaseModel):
    username: str
    password: str

@app.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == form_data.username).first()

    if user is None or not verify_password(form_data.password, user.password):
        raise HTTPException(status_code=401, detail="帳號或密碼錯誤")

    user.last_login = datetime.now(timezone.utc)
    db.commit()

    token = create_access_token({"sub": user.username})
    return {"access_token": token, "token_type": "bearer"}

@app.get("/user/")
def get_user(
    username: str = Query(...),
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user)
):
    user = db.query(User).filter(User.username == username).first()

    if not user:
        raise HTTPException(status_code=400, detail="使用者不存在")

    return user

@app.post("/user/", response_model=UserOut)
def create_user(
    data: UserCreate, 
    db: Session = Depends(get_db),
    # _: User = Depends(get_current_user)
):
    existing = db.query(User).filter(User.username == data.username).first()
    if existing:
        raise HTTPException(status_code=400, detail="使用者名稱已存在")
    
    new_user = User(
        username=data.username,
        password=hashlib.sha256(data.password.encode()).hexdigest(),
        birthday=data.birthday
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.delete("/user/", status_code=200)
def delete_user(username: str = Form(...), db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=400, detail="User not found")
    
    db.delete(user)
    db.commit()
    return {"message": f"User '{username}' deleted"}

@app.patch("/user/")
def update_user(data: UserUpdate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if data.password:
        current_user.password = hashlib.sha256(data.password.encode()).hexdigest()
    if data.birthday:
        current_user.birthday = data.birthday

    db.commit()
    db.refresh(current_user)
    return current_user