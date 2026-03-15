import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">

      {/* Navbar */}
      <nav className="px-8 py-5 flex justify-between items-center border-b border-gray-800">
        <h1 className="text-xl font-bold text-blue-500">Campus Autopilot AI</h1>
        <div className="flex gap-4">
          <Link href="/login" className="text-gray-400 hover:text-white text-sm transition">Login</Link>
          <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition">
            Get Started →
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center px-8 py-24">
        <div className="inline-block bg-blue-900 text-blue-300 text-xs px-3 py-1 rounded-full mb-6">
          🚀 AI-Powered College Operations
        </div>
        <h1 className="text-5xl font-bold mb-6 leading-tight">
          The AI Brain for<br />
          <span className="text-blue-500">Your College</span>
        </h1>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-10">
          Detect student risks, analyze resumes, automate operations — all in one intelligent platform. Built for modern colleges.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl text-lg transition">
            Start Free Trial →
          </Link>
          <Link href="#features" className="border border-gray-700 hover:border-gray-500 text-gray-300 font-semibold px-8 py-4 rounded-xl text-lg transition">
            See Features
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-8 py-12 border-y border-gray-800">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "10x", label: "Faster Risk Detection" },
            { value: "84%", label: "Placement Success Rate" },
            { value: "30+", label: "Skills Tracked" },
            { value: "100%", label: "AI Powered" },
          ].map((stat, i) => (
            <div key={i}>
              <p className="text-4xl font-bold text-blue-500 mb-2">{stat.value}</p>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-8 py-24 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Everything Your College Needs</h2>
          <p className="text-gray-400">One platform. All the intelligence.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: "⚠️",
              title: "AI Risk Detection",
              desc: "Identify students at risk of failing or dropping out — before it's too late. Get HIGH/MEDIUM/LOW risk scores instantly.",
              color: "border-red-800"
            },
            {
              icon: "🧠",
              title: "Student Digital Twin",
              desc: "Every student gets an AI-generated profile with skills, weaknesses, career paths, and target company suggestions.",
              color: "border-purple-800"
            },
            {
              icon: "📄",
              title: "Resume Analyzer",
              desc: "Upload any student resume and get instant skill gap analysis, missing skills detection, and a score out of 100.",
              color: "border-green-800"
            },
            {
              icon: "💬",
              title: "AI Knowledge Base",
              desc: "Upload college documents — syllabus, policies, circulars. Ask anything. AI answers instantly from your documents.",
              color: "border-yellow-800"
            },
            {
              icon: "📊",
              title: "Admin Dashboard",
              desc: "Real-time analytics dashboard with risk heatmaps, placement stats, and student performance insights.",
              color: "border-blue-800"
            },
            {
              icon: "🔐",
              title: "Secure Auth System",
              desc: "JWT-based authentication with bcrypt password hashing. Enterprise-grade security for your institution's data.",
              color: "border-gray-700"
            },
          ].map((feature, i) => (
            <div key={i} className={`bg-gray-900 border ${feature.color} rounded-xl p-6 hover:scale-105 transition-transform duration-200`}>
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 py-24 text-center bg-gray-900 border-t border-gray-800">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Automate Your<br />
          <span className="text-blue-500">College Operations?</span>
        </h2>
        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
          Join the future of college management. Set up in minutes, see results instantly.
        </p>
        <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 py-4 rounded-xl text-lg transition">
          Get Started Free →
        </Link>
      </section>

      {/* Footer */}
      <footer className="px-8 py-8 border-t border-gray-800 flex justify-between items-center">
        <p className="text-gray-500 text-sm">© 2026 Campus Autopilot AI — Built by Deepanshu Maheshwari</p>
        <p className="text-gray-500 text-sm">IIST Indore</p>
      </footer>

    </main>
  );
}