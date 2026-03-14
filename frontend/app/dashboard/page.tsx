"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/lib/api";
import toast, { Toaster } from "react-hot-toast";
import { Users, AlertTriangle, CheckCircle, AlertCircle } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [students, setStudents] = useState<any[]>([]);
  const [riskData, setRiskData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [studentsRes, riskRes] = await Promise.all([
        API.get("/students/"),
        API.get("/risk/"),
      ]);
      setStudents(studentsRes.data);
      setRiskData(riskRes.data);
    } catch (err) {
      toast.error("Failed to fetch data!");
    } finally {
      setLoading(false);
    }
  };

  const getRiskBadge = (level: string) => {
    if (level === "HIGH")
      return <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">HIGH</span>;
    if (level === "MEDIUM")
      return <span className="px-2 py-1 bg-yellow-500 text-white text-xs rounded-full">MEDIUM</span>;
    return <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">LOW</span>;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-blue-500 text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Toaster />

      {/* Navbar */}
      <nav className="bg-gray-900 px-8 py-4 flex justify-between items-center border-b border-gray-800">
        <h1 className="text-xl font-bold text-blue-500">Campus Autopilot AI</h1>
        <button
          onClick={handleLogout}
          className="text-gray-400 hover:text-white text-sm transition"
        >
          Logout
        </button>
      </nav>

      <div className="p-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center gap-3 mb-2">
              <Users className="text-blue-500" size={24} />
              <span className="text-gray-400 text-sm">Total Students</span>
            </div>
            <p className="text-3xl font-bold">{riskData?.total_students || 0}</p>
          </div>

          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="text-red-500" size={24} />
              <span className="text-gray-400 text-sm">High Risk</span>
            </div>
            <p className="text-3xl font-bold text-red-500">{riskData?.high_risk || 0}</p>
          </div>

          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center gap-3 mb-2">
              <AlertCircle className="text-yellow-500" size={24} />
              <span className="text-gray-400 text-sm">Medium Risk</span>
            </div>
            <p className="text-3xl font-bold text-yellow-500">{riskData?.medium_risk || 0}</p>
          </div>

          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="text-green-500" size={24} />
              <span className="text-gray-400 text-sm">Low Risk</span>
            </div>
            <p className="text-3xl font-bold text-green-500">{riskData?.low_risk || 0}</p>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-gray-900 rounded-xl border border-gray-800">
          <div className="p-6 border-b border-gray-800">
            <h2 className="text-lg font-semibold">Student Risk Analysis</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left text-gray-400 text-sm px-6 py-4">Student</th>
                  <th className="text-left text-gray-400 text-sm px-6 py-4">Roll No</th>
                  <th className="text-left text-gray-400 text-sm px-6 py-4">Attendance</th>
                  <th className="text-left text-gray-400 text-sm px-6 py-4">CGPA</th>
                  <th className="text-left text-gray-400 text-sm px-6 py-4">Backlogs</th>
                  <th className="text-left text-gray-400 text-sm px-6 py-4">Risk</th>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}