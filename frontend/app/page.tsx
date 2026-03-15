"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    { icon: "⚠️", title: "AI Risk Detector", desc: "Predicts student failure before it happens. HIGH / MEDIUM / LOW risk scoring." },
    { icon: "🧠", title: "Digital Twin", desc: "AI-generated profile for every student with career paths and target companies." },
    { icon: "📄", title: "Resume Analyzer", desc: "Upload PDF resume. Get skill gap report and score out of 100 instantly." },
    { icon: "💬", title: "AI Knowledge Base", desc: "Ask anything about your college. AI answers from your own documents." },
    { icon: "📊", title: "Analytics Dashboard", desc: "Real-time risk heatmaps, placement stats and department performance." },
    { icon: "🔐", title: "Secure Auth", desc: "JWT-based college admin authentication with bcrypt password security." },
  ];

  const stats = [
    { value: "10+", label: "AI Features" },
    { value: "100%", label: "Automated" },
    { value: "Free", label: "To Start" },
    { value: "24/7", label: "AI Running" },
  ];

  return (
    <main style={{
      minHeight: "100vh",
      background: "#020817",
      color: "#fff",
      fontFamily: "'DM Sans', sans-serif",
      overflowX: "hidden"
    }}>
      {/* Google Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@700;800&display=swap');
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        .glow { 
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.15;
          pointer-events: none;
        }

        .nav-link {
          color: #94a3b8;
          text-decoration: none;
          font-size: 14px;
          transition: color 0.2s;
        }
        .nav-link:hover { color: #fff; }

        .feature-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          padding: 28px;
          transition: all 0.3s;
          cursor: default;
        }
        .feature-card:hover {
          background: rgba(59,130,246,0.08);
          border-color: rgba(59,130,246,0.3);
          transform: translateY(-4px);
        }

        .btn-primary {
          background: #3b82f6;
          color: white;
          border: none;
          padding: 14px 32px;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .btn-primary:hover { background: #2563eb; transform: translateY(-2px); }

        .btn-secondary {
          background: transparent;
          color: #94a3b8;
          border: 1px solid rgba(255,255,255,0.1);
          padding: 14px 32px;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .btn-secondary:hover { color: white; border-color: rgba(255,255,255,0.3); }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(59,130,246,0.1);
          border: 1px solid rgba(59,130,246,0.2);
          color: #93c5fd;
          padding: 6px 14px;
          border-radius: 100px;
          font-size: 13px;
          font-weight: 500;
        }

        .grid-2 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .grid-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        @media (max-width: 768px) {
          .grid-2, .grid-3 { grid-template-columns: 1fr; }
          .hero-title { font-size: 36px !important; }
          .nav-links { display: none; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }

        .fade-in {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeIn 0.8s forwards;
        }
        @keyframes fadeIn {
          to { opacity: 1; transform: translateY(0); }
        }

        .pulse-dot {
          width: 8px;
          height: 8px;
          background: #22c55e;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>

      {/* Background glows */}
      <div className="glow" style={{ width: 600, height: 600, background: "#3b82f6", top: -200, left: -200 }} />
      <div className="glow" style={{ width: 400, height: 400, background: "#8b5cf6", top: 200, right: -100 }} />

      {/* Navbar */}
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "20px 60px", position: "sticky", top: 0, zIndex: 100,
        background: "rgba(2,8,23,0.8)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 20 }}>🎓</span>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18 }}>
            Campus Autopilot <span style={{ color: "#3b82f6" }}>AI</span>
          </span>
        </div>
        <div className="nav-links" style={{ display: "flex", gap: 32 }}>
          <a href="#features" className="nav-link">Features</a>
          <a href="#how" className="nav-link">How it works</a>
          <a href="#stats" className="nav-link">Stats</a>
        </div>
        <button className="btn-primary" style={{ padding: "10px 24px", fontSize: 14 }}
          onClick={() => router.push("/login")}>
          Get Started →
        </button>
      </nav>

      {/* Hero */}
      <section style={{ textAlign: "center", padding: "100px 20px 80px", position: "relative" }}>
        <div className="fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="badge" style={{ marginBottom: 24 }}>
            <div className="pulse-dot" />
            AI-Powered College Operations
          </div>
        </div>

        <h1 className="fade-in hero-title" style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 64, fontWeight: 800, lineHeight: 1.1,
          marginBottom: 24, animationDelay: "0.2s",
          maxWidth: 800, margin: "0 auto 24px"
        }}>
          The AI Operating System<br />
          <span style={{ color: "#3b82f6" }}>for Your College</span>
        </h1>

        <p className="fade-in" style={{
          color: "#94a3b8", fontSize: 20, maxWidth: 560,
          margin: "0 auto 40px", lineHeight: 1.7, animationDelay: "0.3s"
        }}>
          Detect student risks, analyze resumes, answer institutional questions,
          and automate college operations — all with AI.
        </p>

        <div className="fade-in" style={{ display: "flex", gap: 16, justifyContent: "center", animationDelay: "0.4s" }}>
          <button className="btn-primary" onClick={() => router.push("/login")}>
            Start Free →
          </button>
          <button className="btn-secondary" onClick={() => router.push("/login")}>
            View Demo
          </button>
        </div>

        {/* Hero Dashboard Preview */}
        <div className="fade-in" style={{
          marginTop: 60, maxWidth: 900, margin: "60px auto 0",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 20, padding: 24, animationDelay: "0.5s"
        }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            {["#ff5f57","#ffbd2e","#28ca41"].map(c => (
              <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
            ))}
            <div style={{
              flex: 1, background: "rgba(255,255,255,0.05)",
              borderRadius: 6, padding: "4px 12px", fontSize: 12, color: "#64748b"
            }}>campus-autopilot.ai/dashboard</div>
          </div>

          {/* Mock Dashboard */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 16 }}>
            {[
              { label: "Total Students", value: "450", color: "#3b82f6" },
              { label: "High Risk", value: "23", color: "#ef4444" },
              { label: "Medium Risk", value: "87", color: "#f59e0b" },
              { label: "Low Risk", value: "340", color: "#22c55e" },
            ].map(card => (
              <div key={card.label} style={{
                background: "rgba(255,255,255,0.04)", borderRadius: 12,
                padding: "16px", border: "1px solid rgba(255,255,255,0.06)"
              }}>
                <div style={{ fontSize: 11, color: "#64748b", marginBottom: 6 }}>{card.label}</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: card.color }}>{card.value}</div>
              </div>
            ))}
          </div>

          <div style={{
            background: "rgba(255,255,255,0.02)", borderRadius: 12,
            padding: 16, border: "1px solid rgba(255,255,255,0.04)"
          }}>
            <div style={{ fontSize: 12, color: "#64748b", marginBottom: 12 }}>Student Risk Analysis</div>
            {[
              { name: "Rahul Sharma", risk: "MEDIUM", color: "#f59e0b" },
              { name: "Priya Singh", risk: "HIGH", color: "#ef4444" },
              { name: "Amit Kumar", risk: "LOW", color: "#22c55e" },
            ].map(s => (
              <div key={s.name} style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center", padding: "8px 0",
                borderBottom: "1px solid rgba(255,255,255,0.04)"
              }}>
                <span style={{ fontSize: 13, color: "#e2e8f0" }}>{s.name}</span>
                <span style={{
                  background: `${s.color}20`, color: s.color,
                  padding: "3px 10px", borderRadius: 100, fontSize: 11, fontWeight: 600
                }}>{s.risk}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="stats" style={{ padding: "60px 60px" }}>
        <div className="stats-grid" style={{
          display: "grid", gridTemplateColumns: "repeat(4,1fr)",
          gap: 20, maxWidth: 900, margin: "0 auto",
          background: "rgba(59,130,246,0.05)",
          border: "1px solid rgba(59,130,246,0.1)",
          borderRadius: 20, padding: 40
        }}>
          {stats.map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 40, fontWeight: 800, fontFamily: "'Space Grotesk',sans-serif", color: "#3b82f6" }}>{s.value}</div>
              <div style={{ color: "#64748b", fontSize: 14, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ padding: "80px 60px" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 40, fontWeight: 700, marginBottom: 16 }}>
            Everything your college needs
          </h2>
          <p style={{ color: "#64748b", fontSize: 18 }}>6 powerful AI modules in one platform</p>
        </div>

        <div className="grid-3" style={{ maxWidth: 1000, margin: "0 auto" }}>
          {features.map(f => (
            <div key={f.title} className="feature-card">
              <div style={{ fontSize: 32, marginBottom: 12 }}>{f.icon}</div>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{f.title}</h3>
              <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" style={{ padding: "80px 60px", background: "rgba(255,255,255,0.01)" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 40, fontWeight: 700, marginBottom: 16 }}>
            How it works
          </h2>
        </div>
        <div className="grid-3" style={{ maxWidth: 900, margin: "0 auto" }}>
          {[
            { step: "01", title: "Register Your College", desc: "Create admin account and onboard your institution in minutes." },
            { step: "02", title: "Add Student Data", desc: "Import student records — attendance, grades, and documents." },
            { step: "03", title: "Let AI Do the Rest", desc: "AI detects risks, generates profiles, and answers your questions." },
          ].map(s => (
            <div key={s.step} style={{ textAlign: "center", padding: "20px" }}>
              <div style={{
                fontSize: 48, fontWeight: 800, color: "rgba(59,130,246,0.2)",
                fontFamily: "'Space Grotesk',sans-serif", marginBottom: 16
              }}>{s.step}</div>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{s.title}</h3>
              <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 60px", textAlign: "center" }}>
        <div style={{
          maxWidth: 600, margin: "0 auto",
          background: "rgba(59,130,246,0.08)",
          border: "1px solid rgba(59,130,246,0.15)",
          borderRadius: 24, padding: "60px 40px"
        }}>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 36, fontWeight: 700, marginBottom: 16 }}>
            Ready to Autopilot<br />your college?
          </h2>
          <p style={{ color: "#64748b", marginBottom: 32, fontSize: 16 }}>
            Join colleges using AI to detect risks and improve outcomes.
          </p>
          <button className="btn-primary" style={{ fontSize: 18, padding: "16px 40px" }}
            onClick={() => router.push("/login")}>
            Get Started Free →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: "30px 60px", borderTop: "1px solid rgba(255,255,255,0.05)",
        display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <span style={{ color: "#3b82f6", fontWeight: 700 }}>Campus Autopilot AI</span>
        <span style={{ color: "#475569", fontSize: 13 }}>Built solo by Deepanshu Maheshwari — IIST Indore 2026</span>
      </footer>
    </main>
  );
}