from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.resume_analyzer import analyze_resume
import pypdf
import io

router = APIRouter(prefix="/resume", tags=["Resume Analyzer"])

@router.post("/analyze")
async def analyze_resume_file(file: UploadFile = File(...)):
    # Sirf PDF allow karo
    if not file.filename.endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files allowed"
        )

    # PDF read karo
    contents = await file.read()
    pdf_reader = pypdf.PdfReader(io.BytesIO(contents))
    
    # Text extract karo
    text = ""
    for page in pdf_reader.pages:
        text += page.extract_text()

    if not text.strip():
        raise HTTPException(
            status_code=400,
            detail="Could not extract text from PDF"
        )

    # Analyze karo
    result = analyze_resume(text)
    return result