<div align="center">

<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=28&pause=1000&color=3B82F6&center=true&vCenter=true&width=700&lines=🚀+Campus+Autopilot+AI;AI+Operating+System+for+Colleges; Detect+Risk.+Analyze+Resumes.+Automate+Ops." alt="Typing SVG" />

<br/>

[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://postgresql.org)
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![LangChain](https://img.shields.io/badge/LangChain-121212?style=for-the-badge&logo=chainlink&logoColor=white)](https://langchain.com)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)

<br/>

> **Campus Autopilot AI** is a full-stack AI SaaS platform that acts as an **AI Operating System for colleges**.
> It detects student risks, generates AI profiles, analyzes resumes, and answers institutional queries — all autonomously.

<br/>

![GitHub stars](https://img.shields.io/github/stars/deepanshumaheshwari907-spec/campus-autopilot-ai?style=social)
![GitHub forks](https://img.shields.io/github/forks/deepanshumaheshwari907-spec/campus-autopilot-ai?style=social)
![GitHub issues](https://img.shields.io/github/issues/deepanshumaheshwari907-spec/campus-autopilot-ai?style=social)

</div>

---

## 🧠 What is Campus Autopilot AI?

Most colleges still manage student data manually — spreadsheets, WhatsApp groups, and guesswork.

**Campus Autopilot AI** changes that.

It connects student attendance, grades, and documents into one intelligent platform — and uses AI to:
- 🔴 Detect which students are at risk **before** they fail
- 🧠 Generate an AI profile for every student with career suggestions
- 📄 Analyze resumes and detect missing skills instantly
- 💬 Answer any question about the college from uploaded documents
- 📊 Give admins a real-time operations dashboard

---

## ✨ Core Modules

<table>
<tr>
<td width="50%">

### 🔐 Auth System
- JWT-based secure login
- College admin registration
- bcrypt password hashing
- Token refresh support

### ⚠️ AI Risk Detector
- Scores every student 0–100
- **HIGH / MEDIUM / LOW** risk levels
- Based on attendance, CGPA, backlogs
- Auto-generates recommendations

### 🧠 Student Digital Twin
- AI profile for every student
- Skills + weaknesses detection
- Career path suggestions
- Target company recommendations

</td>
<td width="50%">

### 📄 Resume Analyzer
- PDF upload & text extraction
- 30+ technical skills detection
- Soft skills detection
- Missing skills gap report
- Resume score out of 100

### 💬 AI Knowledge Base (RAG)
- Upload any college document (PDF/TXT)
- Ask questions in plain English
- Powered by LangChain + Groq LLM
- ChromaDB vector search

### 📊 Admin Dashboard
- Real-time risk analytics
- Student management table
- 4-tab navigation UI
- Clean dark mode design

</td>
</tr>
</table>

---

## 🏗️ System Architecture
```
┌──────────────────────────────────────────────────────────────┐
│                    CAMPUS AUTOPILOT AI                        │
│                                                              │
│   ┌─────────────┐    ┌──────────────┐    ┌───────────────┐  │
│   │  FRONTEND   │    │   BACKEND    │    │   AI LAYER    │  │
│   │             │◄──►│              │◄──►│               │  │
│   │  Next.js    │    │  FastAPI     │    │  Groq LLM     │  │
│   │  Tailwind   │    │  PostgreSQL  │    │  LangChain    │  │
│   │  TypeScript │    │  SQLAlchemy  │    │  ChromaDB     │  │
│   │             │    │  JWT Auth    │    │  HuggingFace  │  │
│   └─────────────┘    └──────────────┘    └───────────────┘  │
│                                                              │
│   Data Flow:                                                 │
│   Student Data → Risk Engine → AI Profile → Dashboard        │
│   Documents → Embeddings → Vector DB → RAG → Answer          │
│   Resume PDF → Text Extract → Skill Match → Score            │
└──────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technology | Why? |
|-------|-----------|------|
| 🎨 Frontend | Next.js 16 + TailwindCSS | Fast, scalable, beautiful UI |
| ⚡ Backend | FastAPI (Python) | High performance async API |
| 🗄️ Database | PostgreSQL | Reliable relational storage |
| 🤖 LLM | Groq (Llama 3.1 8B) | Free, blazing fast inference |
| 🔢 Embeddings | HuggingFace all-MiniLM-L6-v2 | Free local embeddings |
| 📦 Vector DB | ChromaDB | Simple local vector search |
| 🔐 Auth | JWT + bcrypt | Industry standard security |
| 📦 ORM | SQLAlchemy | Clean database abstraction |

---

## 🚀 Getting Started

### Prerequisites
```
Python 3.10+
Node.js 18+
PostgreSQL 14+
Git
```

### 1️⃣ Clone
```bash
git clone https://github.com/deepanshumaheshwari907-spec/campus-autopilot-ai.git
cd campus-autopilot-ai
```

### 2️⃣ Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
source venv/bin/activate     # Mac/Linux
pip install -r requirements.txt
uvicorn main:app --reload
```
Backend running at → `http://localhost:8000`
Swagger UI at → `http://localhost:8000/docs`

### 3️⃣ Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend running at → `http://localhost:3000`

### 4️⃣ Environment Variables
Create `.env` in root:
```env
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/campus_autopilot
SECRET_KEY=your-super-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
GROQ_API_KEY=your-groq-api-key
```

---

## 📡 API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/register` | Register college admin |
| `POST` | `/auth/login` | Login → get JWT token |
| `GET` | `/students/` | Get all students |
| `POST` | `/students/` | Add new student |
| `PUT` | `/students/{id}` | Update student |
| `DELETE` | `/students/{id}` | Delete student |
| `GET` | `/risk/` | All students risk report |
| `GET` | `/risk/{id}` | Single student risk score |
| `GET` | `/digital-twin/{id}` | AI student profile |
| `POST` | `/resume/analyze` | Analyze PDF resume |
| `POST` | `/rag/upload` | Upload college document |
| `POST` | `/rag/ask` | Ask AI about college |

---

## 🗺️ Roadmap
```
v1.0 — MVP ✅
├── [x] Authentication System
├── [x] Student Management CRUD
├── [x] AI Risk Detection Engine
├── [x] Student Digital Twin
├── [x] Resume Analyzer
├── [x] RAG Knowledge Base
└── [x] Admin Dashboard

v1.1 — Coming Soon 🔜
├── [ ] WhatsApp Automation (n8n)
├── [ ] Email Notification System
├── [ ] Placement Management Module
├── [ ] Multi-college Support
└── [ ] Cloud Deployment (Vercel + Railway)

v2.0 — Future 🚀
├── [ ] Mobile App (React Native)
├── [ ] Timetable Conflict Detection
├── [ ] Faculty Performance Analytics
└── [ ] Student Self-Service Portal
```

---

## 📁 Project Structure
```
campus-autopilot-ai/
├── backend/
│   ├── app/
│   │   ├── api/            # Route handlers
│   │   │   ├── auth.py
│   │   │   ├── students.py
│   │   │   ├── risk.py
│   │   │   ├── digital_twin.py
│   │   │   ├── resume.py
│   │   │   └── rag.py
│   │   ├── core/           # Security & config
│   │   ├── db/             # Database connection
│   │   ├── models/         # SQLAlchemy models
│   │   ├── services/       # Business logic & AI
│   │   └── documents/      # Uploaded documents
│   └── main.py
├── frontend/
│   ├── app/
│   │   ├── dashboard/      # Admin dashboard
│   │   └── login/          # Login page
│   ├── components/
│   └── lib/                # API utilities
├── .env
└── README.md
```

---

## 👨‍💻 About the Builder

<div align="center">

| | |
|---|---|
| **Name** | Deepanshu Maheshwari |
| **College** | IIST Indore |
| **Year** | 3rd Year Engineering |
| **Domain** | Full Stack + AI/ML |
| **GitHub** | [@deepanshumaheshwari907-spec](https://github.com/deepanshumaheshwari907-spec) |

> *"Built this entire platform solo — from database design to AI pipelines to frontend UI. Every line of code, every bug, every fix — all done independently."*

</div>

---

<div align="center">

### 💙 If this project helped you, please give it a ⭐

**Campus Autopilot AI — Built Solo with ❤️ by Deepanshu Maheshwari**

*IIST Indore — 2026*

</div>
