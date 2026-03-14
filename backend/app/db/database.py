from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

# .env file load karo
load_dotenv()

# Database URL .env se lo
DATABASE_URL = os.getenv("DATABASE_URL")

# Database engine banao
engine = create_engine(DATABASE_URL)

# Session banao
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class — sab models isse inherit karenge
Base = declarative_base()

# Dependency — har API request ke liye DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()