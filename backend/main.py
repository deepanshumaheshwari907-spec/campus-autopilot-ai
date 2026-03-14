from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.database import engine, Base
from app.models import user, student
from app.api import auth, students
from app.api import risk
from app.api import rag


# Database tables auto-create karo
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Campus Autopilot AI",
    description="AI-powered Autonomous College Operations System",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(auth.router)
app.include_router(students.router)
app.include_router(risk.router)
app.include_router(rag.router)


@app.get("/")
def root():
    return {
        "message": "Campus Autopilot AI — Backend Online 🚀",
        "status": "running",
        "version": "1.0.0"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}