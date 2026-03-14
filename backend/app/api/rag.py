from fastapi import APIRouter, UploadFile, File, HTTPException
from pydantic import BaseModel
import shutil
import os
from app.services.rag_service import load_and_store_document, query_documents

router = APIRouter(prefix="/rag", tags=["AI Knowledge Base"])

UPLOAD_DIR = "./app/documents"

class QuestionRequest(BaseModel):
    question: str

# Document upload karo
@router.post("/upload")
async def upload_document(file: UploadFile = File(...)):
    # Sirf PDF aur TXT allow karo
    if not file.filename.endswith((".pdf", ".txt")):
        raise HTTPException(
            status_code=400,
            detail="Only PDF and TXT files allowed"
        )

    # File save karo
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as f:
        shutil.copyfileobj(file.file, f)

    # Document process karo
    result = load_and_store_document(file_path)
    return result

# Question poochho
@router.post("/ask")
async def ask_question(request: QuestionRequest):
    if not request.question:
        raise HTTPException(
            status_code=400,
            detail="Question cannot be empty"
        )
    result = query_documents(request.question)
    return result