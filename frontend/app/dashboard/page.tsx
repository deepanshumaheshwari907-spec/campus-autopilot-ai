"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/lib/api";
import toast, { Toaster } from "react-hot-toast";
import { Users, AlertTriangle, CheckCircle, AlertCircle, Brain, FileText, MessageSquare } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [riskData, setRiskData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [digitalTwin, setDigitalTwin] = useState<any>(null);
  const [resumeResult, setResumeResult] = useState<any>(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<any>(null);
  const [askLoading, setAskLoading] = useState(false);
  const [resumeLoading, setResumeLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [newStudent, setNewStudent] = useState({
    roll_number: "", full_name: "", email: "",
    branch: "CSE", year: 1,
    attendance_percentage: 0, cgpa: 0,
    backlogs: 0, is_placement_eligible: false
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/login"); return; }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const riskRes = await API.get("/risk/");
      setRiskData(riskRes.data);
    } catch (err) {
      toast.error("Failed to fetch data!");
    } finally {
      setLoading(false);
    }
  };

  const fetchDigitalTwin = async (studentId: number) => {
    try {
      const res = await API.get(`/digital-twin/${studentId}`);
      setDigitalTwin(res.data);
    } catch (err) {
      toast.error("Failed to fetch digital twin!");
    }
  };

  const handleAddStudent = async () => {
    setAddLoading(true);
    try {
      await API.post("/students/", newStudent);
      toast.success("Student added!");
      setShowAddForm(false);
      fetchData();
    } catch (err) {
      toast.error("Failed to add student!");
    } finally {
      setAddLoading(false);
    }
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setResumeLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await API.post("/resume/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setResumeResult(res.data);
      toast.success("Resume analyzed!");
    } catch (err) {
      toast.error("Failed to analyze resume!");
    } finally {
      setResumeLoading(false);
    }
  };

  const handleAskQuestion = async () => {
    if (!question) return;
    setAskLoading(true);
    try {
      const res = await API.post("/rag/ask", { question });
      setAnswer(res.data);
    } catch (err) {
      toast.error("Failed to get answer!");
    } finally {
      setAskLoading(false);
    }
  };

  const getRiskBadge = (level: string) => {
    if (level === "HIGH") return <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">HIGH</span>;
    if (level === "MEDIUM") return <span className="px-2 py-1 bg-yellow-500 text-white text-xs rounded-full">MEDIUM</span>;
    return <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">LOW</span>;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <p className="text-blue-500 text-xl">Loading...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Toaster />
      {/* Navbar */}
      <nav className="bg-gray-900 px-8 py-4 flex justify-between items-center border-b border-gray-800">
        <h1 className="text-xl font-bold text-blue-500">Campus Autopilot AI</h1>
        <div className="flex gap-6">
          {[
            { id: "dashboard", icon: <Users size={16} />, label: "Dashboard" },
            { id: "twin", icon: <Brain size={16} />, label: "Digital Twin" },
            { id: "resume", icon: <FileText size={16} />, label: "Resume" },
            { id: "ask", icon: <MessageSquare size={16} />, label: "AI Ask" },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 text-sm px-3 py-1 rounded-lg transition ${activeTab === tab.id ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"}`}>
              {tab.icon}{tab.label}
            </button>
          ))}
          <button onClick={handleLogout} className="text-gray-400 hover:text-white text-sm">Logout</button>
        </div>
      </nav>

      <div className="p-8">
        {/* DASHBOARD TAB */}
        {activeTab === "dashboard" && (
          <>
            {/* Header + Add Button */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Dashboard</h2>
              <button onClick={() => setShowAddForm(!showAddForm)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition">
                {showAddForm ? "Cancel" : "+ Add Student"}
              </button>
            </div>

            {/* Add Student Form */}
            {showAddForm && (
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 mb-6">
                <h3 className="text-lg font-semibold mb-4">Add New Student</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Roll Number", key: "roll_number", type: "text" },
                    { label: "Full Name", key: "full_name", type: "text" },
                    { label: "Email", key: "email", type: "email" },
                    { label: "CGPA", key: "cgpa", type: "number" },
                    { label: "Attendance %", key: "attendance_percentage", type: "number" },
                    { label: "Backlogs", key: "backlogs", type: "number" },
                  ].map(field => (
                    <div key={field.key}>
                      <label className="text-gray-400 text-sm mb-1 block">{field.label}</label>
                      <input type={field.type}
                       value={(newStudent as any)[field.key] ?? ""}
                        onChange={e => setNewStudent({...newStudent, [field.key]: field.type === "number" ? parseFloat(e.target.value) : e.target.value})}
                        className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                  ))}
                  <div>
                    <label className="text-gray-400 text-sm mb-1 block">Branch</label>
                    <select value={newStudent.branch}
                      onChange={e => setNewStudent({...newStudent, branch: e.target.value})}
                      className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      {["CSE","AIML","ECE","ME","CE"].map(b => <option key={b}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm mb-1 block">Year</label>
                    <select value={newStudent.year}
                      onChange={e => setNewStudent({...newStudent, year: parseInt(e.target.value)})}
                      className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      {[1,2,3,4].map(y => <option key={y}>{y}</option>)}
                    </select>
                  </div>
                </div>
                <button onClick={handleAddStudent} disabled={addLoading}
                  className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition">
                  {addLoading ? "Adding..." : "Add Student ✓"}
                </button>
              </div>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[
                { icon: <Users className="text-blue-500" size={24} />, label: "Total Students", value: riskData?.total_students || 0, color: "text-white" },
                { icon: <AlertTriangle className="text-red-500" size={24} />, label: "High Risk", value: riskData?.high_risk || 0, color: "text-red-500" },
                { icon: <AlertCircle className="text-yellow-500" size={24} />, label: "Medium Risk", value: riskData?.medium_risk || 0, color: "text-yellow-500" },
                { icon: <CheckCircle className="text-green-500" size={24} />, label: "Low Risk", value: riskData?.low_risk || 0, color: "text-green-500" },
              ].map((card, i) => (
                <div key={i} className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                  <div className="flex items-center gap-3 mb-2">{card.icon}<span className="text-gray-400 text-sm">{card.label}</span></div>
                  <p className={`text-3xl font-bold ${card.color}`}>{card.value}</p>
                </div>
              ))}
            </div>

            {/* Students Table */}
            <div className="bg-gray-900 rounded-xl border border-gray-800">
              <div className="p-6 border-b border-gray-800"><h2 className="text-lg font-semibold">Student Risk Analysis</h2></div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800">
                      {["Student", "Roll No", "Attendance", "CGPA", "Backlogs", "Risk", "Action"].map(h => (
                        <th key={h} className="text-left text-gray-400 text-sm px-6 py-4">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {riskData?.data?.map((student: any) => (
                      <tr key={student.student_id} className="border-b border-gray-800 hover:bg-gray-800 transition">
                        <td className="px-6 py-4 font-medium">{student.full_name}</td>
                        <td className="px-6 py-4 text-gray-400">{student.roll_number}</td>
                        <td className="px-6 py-4">{student.attendance_percentage ?? "N/A"}%</td>
                        <td className="px-6 py-4">{student.cgpa ?? "N/A"}</td>
                        <td className="px-6 py-4">{student.backlogs ?? 0}</td>
                        <td className="px-6 py-4">{getRiskBadge(student.risk_level)}</td>
                        <td className="px-6 py-4">
                          <button onClick={() => { setSelectedStudent(student); fetchDigitalTwin(student.student_id); setActiveTab("twin"); }}
                            className="text-blue-400 hover:text-blue-300 text-sm">View Twin →</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* DIGITAL TWIN TAB */}
        {activeTab === "twin" && (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">🧠 Student Digital Twin</h2>
            {digitalTwin ? (
              <div className="space-y-4">
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                  <h3 className="text-xl font-bold text-blue-400 mb-4">{digitalTwin.student_name} — {digitalTwin.branch}</h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div><span className="text-gray-400">CGPA:</span> <span className="font-bold">{digitalTwin.cgpa}</span></div>
                    <div><span className="text-gray-400">Attendance:</span> <span className="font-bold">{digitalTwin.attendance}%</span></div>
                    <div><span className="text-gray-400">Placement:</span> <span className={`font-bold ${digitalTwin.placement_readiness === "HIGH" ? "text-green-400" : digitalTwin.placement_readiness === "MEDIUM" ? "text-yellow-400" : "text-red-400"}`}>{digitalTwin.placement_readiness}</span></div>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">{digitalTwin.readiness_message}</p>
                  <div className="mb-4">
                    <p className="text-gray-400 text-sm mb-2">Skills:</p>
                    <div className="flex flex-wrap gap-2">{digitalTwin.skills?.map((s: string) => <span key={s} className="px-2 py-1 bg-blue-900 text-blue-300 text-xs rounded">{s}</span>)}</div>
                  </div>
                  <div className="mb-4">
                    <p className="text-gray-400 text-sm mb-2">Career Paths:</p>
                    <div className="flex flex-wrap gap-2">{digitalTwin.suggested_career_paths?.map((c: string) => <span key={c} className="px-2 py-1 bg-purple-900 text-purple-300 text-xs rounded">{c}</span>)}</div>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-2">Target Companies:</p>
                    <div className="flex flex-wrap gap-2">{digitalTwin.target_companies?.map((c: string) => <span key={c} className="px-2 py-1 bg-green-900 text-green-300 text-xs rounded">{c}</span>)}</div>
                  </div>
                </div>
              </div>
            ) : <p className="text-gray-400">Dashboard se kisi student ka "View Twin" click karo!</p>}
          </div>
        )}

        {/* RESUME TAB */}
        {activeTab === "resume" && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">📄 Resume Analyzer</h2>
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 mb-6">
              <p className="text-gray-400 mb-4">PDF resume upload karo — AI analyze karega!</p>
              <input type="file" accept=".pdf" onChange={handleResumeUpload}
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg cursor-pointer" />
              {resumeLoading && <p className="text-blue-400 mt-3">Analyzing...</p>}
            </div>
            {resumeResult && (
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold">Score: {resumeResult.resume_score}/100</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${resumeResult.grade === "Excellent" ? "bg-green-500" : resumeResult.grade === "Good" ? "bg-blue-500" : resumeResult.grade === "Average" ? "bg-yellow-500" : "bg-red-500"}`}>{resumeResult.grade}</span>
                </div>
                <p className="text-gray-400">{resumeResult.message}</p>
                <div>
                  <p className="text-sm text-gray-400 mb-2">Technical Skills Found:</p>
                  <div className="flex flex-wrap gap-2">{resumeResult.technical_skills_found?.map((s: string) => <span key={s} className="px-2 py-1 bg-blue-900 text-blue-300 text-xs rounded">{s}</span>)}</div>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-2">Missing Skills:</p>
                  <div className="flex flex-wrap gap-2">{resumeResult.missing_skills?.map((s: string) => <span key={s} className="px-2 py-1 bg-red-900 text-red-300 text-xs rounded">{s}</span>)}</div>
                </div>
                <p className="text-yellow-400 text-sm">{resumeResult.recommendation}</p>
              </div>
            )}
          </div>
        )}

        {/* AI ASK TAB */}
        {activeTab === "ask" && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">💬 AI Knowledge Base</h2>
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 mb-4">
              <p className="text-gray-400 mb-4">College ke baare mein kuch bhi poocho!</p>
              <input type="text" value={question} onChange={e => setQuestion(e.target.value)}
                placeholder="ML syllabus kya hai? Placement stats?"
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3" />
              <button onClick={handleAskQuestion} disabled={askLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition">
                {askLoading ? "Thinking..." : "Ask AI →"}
              </button>
            </div>
            {answer && (
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <p className="text-gray-400 text-sm mb-2">Question: {answer.question}</p>
                <p className="text-white">{answer.answer}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}