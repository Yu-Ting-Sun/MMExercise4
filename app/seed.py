import sys
import os
sys.path.append(os.path.abspath(os.path.dirname(__file__) + "/.."))

from Models.userORM import User
from db import SessionLocal
from datetime import date, datetime

import hashlib
def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

db = SessionLocal()

users = [
    User(
        username="alice",
        password=hash_password("alice123"),
        birthday=date(1995, 3, 21),
        create_time=datetime.utcnow()
    ),
    User(
        username="bob",
        password=hash_password("bob456"),
        birthday=date(1992, 6, 15),
        create_time=datetime.utcnow()
    ),
    User(
        username="antia",
        password=hash_password("antia608"),
        birthday=date(1994, 9, 20),
        create_time=datetime.utcnow()
    ),
]

db.add_all(users)
db.commit()
db.close()