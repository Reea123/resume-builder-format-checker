import React, { useState } from "react";
import "./App.css";

import TemplateList from "./components/TemplateList";
import SimplePreview from "./components/previews/SimplePreview";
import ModernPreview from "./components/previews/ModernPreview";
import ProfessionalPreview from "./components/previews/ProfessionalPreview";
import CreativePreview from "./components/previews/CreativePreview";
import CVChecker from "./components/CVChecker";

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState("simple");
  const [activePanel, setActivePanel] = useState("form");

  const [data, setData] = useState({
    name: "",
    job_title: "",
    email: "",
    phone: "",
    location: "",
    profile: "",
    skills: "",
    experience: "",
    education: "",
    projects: "",
  });

  const handleChange = (field) => (e) => {
    setData({ ...data, [field]: e.target.value });
  };

  const handleDownload = async () => {
    try {
      const res = await fetch("http://localhost:8000/generate-cv/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, template: selectedTemplate }),
      });

      if (!res.ok) {
        const text = await res.text();
        alert("Error generating PDF: " + text);
        return;
      }

      const blob = await res.blob();
      if (blob.size === 0) { alert("Empty PDF received"); return; }

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${selectedTemplate}_cv.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("Something went wrong while generating CV");
    }
  };

  const renderPreview = () => {
    switch (selectedTemplate) {
      case "modern":       return <ModernPreview data={data} />;
      case "professional": return <ProfessionalPreview data={data} />;
      case "creative":     return <CreativePreview data={data} />;
      default:             return <SimplePreview data={data} />;
    }
  };

  return (
    <div className="app">

      {/* LEFT — Template Selector */}
      <TemplateList
        selectedTemplate={selectedTemplate}
        setSelectedTemplate={setSelectedTemplate}
      />

      {/* CENTER — Live Preview */}
      <div className="preview-section">
        <div className="preview">
          {renderPreview()}
        </div>
      </div>

      {/* RIGHT — Form / CV Checker */}
      <div className="form-section">

        {/* Tab Toggle — Blue Black Theme */}
        <div style={{
          display: "flex", marginBottom: 16,
          border: "1px solid rgba(59,130,246,0.2)",
          borderRadius: 10, overflow: "hidden"
        }}>
          <button
            onClick={() => setActivePanel("form")}
            style={{
              flex: 1, padding: "10px 0", border: "none",
              background: activePanel === "form"
                ? "linear-gradient(90deg, #2196F3, #1565C0)"
                : "#0f1828",
              color: activePanel === "form" ? "#fff" : "#9bb0d3",
              fontWeight: "bold", fontSize: 13,
              cursor: "pointer", borderRadius: 0, margin: 0,
              boxShadow: activePanel === "form" ? "0 4px 16px rgba(33,150,243,0.3)" : "none",
              transition: "all 0.2s ease"
            }}>
            📝 Build CV
          </button>
          <button
            onClick={() => setActivePanel("check")}
            style={{
              flex: 1, padding: "10px 0", border: "none",
              background: activePanel === "check"
                ? "linear-gradient(90deg, #2196F3, #1565C0)"
                : "#0f1828",
              color: activePanel === "check" ? "#fff" : "#9bb0d3",
              fontWeight: "bold", fontSize: 13,
              cursor: "pointer", borderRadius: 0, margin: 0,
              boxShadow: activePanel === "check" ? "0 4px 16px rgba(33,150,243,0.3)" : "none",
              transition: "all 0.2s ease"
            }}>
            🔍 Check CV
          </button>
        </div>

        {/* BUILD CV FORM */}
        {activePanel === "form" && (
          <div>
            <h3 style={{ marginBottom: 14, fontSize: 16, color: "#ffffff" }}>Enter Details</h3>

            <p className="form-divider">Basic Info</p>
            <div className="form-group">
              <label>Full Name</label>
              <input value={data.name} placeholder="e.g. John Doe" onChange={handleChange("name")} />
            </div>
            <div className="form-group">
              <label>Job Title</label>
              <input value={data.job_title} placeholder="e.g. Web Developer" onChange={handleChange("job_title")} />
            </div>

            <p className="form-divider">Contact</p>
            <div className="form-group">
              <label>Email</label>
              <input value={data.email} placeholder="email@example.com" onChange={handleChange("email")} />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input value={data.phone} placeholder="+00 000 000 000" onChange={handleChange("phone")} />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input value={data.location} placeholder="e.g. New York, USA" onChange={handleChange("location")} />
            </div>

            <p className="form-divider">About</p>
            <div className="form-group">
              <label>Profile Summary</label>
              <textarea value={data.profile} placeholder="Brief intro about yourself..." onChange={handleChange("profile")} />
            </div>
            <div className="form-group">
              <label>Skills</label>
              <textarea value={data.skills} placeholder="e.g. Python, React, SQL" onChange={handleChange("skills")} />
            </div>

            <p className="form-divider">Details</p>
            <div className="form-group">
              <label>Experience</label>
              <textarea value={data.experience} placeholder="e.g. Senior Developer at Tech Corp..." onChange={handleChange("experience")} />
            </div>
            <div className="form-group">
              <label>Education</label>
              <textarea value={data.education} placeholder="e.g. B.Sc Computer Science, MIT" onChange={handleChange("education")} />
            </div>
            <div className="form-group">
              <label>Projects</label>
              <textarea value={data.projects} placeholder="e.g. CV Generator App..." onChange={handleChange("projects")} />
            </div>

            <button onClick={handleDownload}>⬇ Download CV</button>
          </div>
        )}

        {/* CHECK CV */}
        {activePanel === "check" && <CVChecker />}

      </div>
    </div>
  );
}

export default App;