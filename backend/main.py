from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Campus Autopilot AI",
    description="AI-powered Autonomous College Operations System",
    version="1.0.0"
)

# CORS — Frontend (Next.js) ko Backend se baat karne deta hai
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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