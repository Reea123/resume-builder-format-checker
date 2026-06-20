import React, { useState } from "react";

const CVChecker = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type === "application/pdf") {
      setFile(selected);
      setResult(null);
      setError(null);
    } else {
      alert("Please upload a PDF file only!");
    }
  };

  const handleCheck = async () => {
    if (!file) { alert("Please upload a PDF first!"); return; }

    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("cv_file", file);

      const res = await fetch("http://localhost:8000/check-cv/", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const scoreColor = (score) => {
    if (score >= 80) return "#4ade80";
    if (score >= 60) return "#facc15";
    return "#f87171";
  };

  return (
    <div style={{ fontFamily: "Segoe UI, sans-serif", padding: "16px 0" }}>

      <h3 style={{ fontSize: 15, color: "#ffffff", margin: "0 0 6px", fontWeight: 700 }}>🔍 CV Checker</h3>
      <p style={{ fontSize: 12, color: "#9bb0d3", margin: "0 0 14px" }}>
        Upload your existing CV to get instant feedback on formatting and content
      </p>

      {/* Upload Area */}
      <div style={{
        border: file ? "2px dashed #2196F3" : "2px dashed rgba(59,130,246,0.25)",
        borderRadius: 10,
        padding: 16, textAlign: "center",
        background: file ? "rgba(33,150,243,0.08)" : "#0f1828",
        marginBottom: 12, cursor: "pointer",
        transition: "all 0.2s ease"
      }}
        onClick={() => document.getElementById("cv-upload").click()}
      >
        <input
          id="cv-upload"
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        {file ? (
          <div>
            <p style={{ fontSize: 24, margin: "0 0 4px" }}>📄</p>
            <p style={{ fontSize: 12, color: "#5badff", fontWeight: "bold", margin: 0 }}>{file.name}</p>
            <p style={{ fontSize: 11, color: "#6b7a99", margin: "4px 0 0" }}>Click to change file</p>
          </div>
        ) : (
          <div>
            <p style={{ fontSize: 24, margin: "0 0 4px" }}>📤</p>
            <p style={{ fontSize: 12, color: "#9bb0d3", margin: 0 }}>Click to upload PDF</p>
          </div>
        )}
      </div>

      {/* Check Button */}
      <button
        onClick={handleCheck}
        disabled={loading || !file}
        style={{
          width: "100%", padding: 13,
          background: loading || !file
            ? "rgba(59,130,246,0.15)"
            : "linear-gradient(90deg, #2196F3, #1565C0)",
          color: loading || !file ? "#6b7a99" : "#fff",
          border: "none", borderRadius: 10,
          fontSize: 14, fontWeight: 700, cursor: loading || !file ? "not-allowed" : "pointer",
          marginBottom: 16,
          boxShadow: loading || !file ? "none" : "0 4px 16px rgba(33,150,243,0.3)",
          letterSpacing: 0.5
        }}>
        {loading ? "⏳ Analyzing your CV..." : "🔍 Check My CV"}
      </button>

      {/* Error */}
      {error && (
        <div style={{ background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.35)", borderRadius: 10, padding: 12, marginBottom: 12 }}>
          <p style={{ fontSize: 12, color: "#f87171", margin: 0 }}>❌ {error}</p>
        </div>
      )}

      {/* Results */}
      {result && (
        <div>

          {/* Score */}
          <div style={{
            textAlign: "center", padding: 16, borderRadius: 12,
            background: "linear-gradient(145deg, #131c30, #0c1320)",
            border: "1px solid rgba(59,130,246,0.18)", marginBottom: 14
          }}>
            <p style={{ fontSize: 11, color: "#6b7a99", margin: "0 0 4px", textTransform: "uppercase", letterSpacing: 1 }}>CV Score</p>
            <p style={{ fontSize: 42, fontWeight: 900, margin: "0 0 4px", color: scoreColor(result.score) }}>
              {result.score}<span style={{ fontSize: 18, color: "#6b7a99" }}>/100</span>
            </p>
            <p style={{ fontSize: 12, color: "#cfe0ff", margin: 0 }}>{result.overall}</p>
          </div>

          {/* Strengths */}
          {result.strengths?.length > 0 && (
            <div style={{ marginBottom: 12, padding: 12, background: "rgba(74,222,128,0.07)", borderRadius: 10, border: "1px solid rgba(74,222,128,0.25)" }}>
              <p style={{ fontSize: 12, fontWeight: "bold", color: "#4ade80", margin: "0 0 8px" }}>✅ Strengths</p>
              {result.strengths.map((s, i) => (
                <p key={i} style={{ fontSize: 11, color: "#cfe0ff", margin: "0 0 4px", paddingLeft: 8 }}>• {s}</p>
              ))}
            </div>
          )}

          {/* Issues */}
          {result.issues?.length > 0 && (
            <div style={{ marginBottom: 12, padding: 12, background: "rgba(248,113,113,0.07)", borderRadius: 10, border: "1px solid rgba(248,113,113,0.25)" }}>
              <p style={{ fontSize: 12, fontWeight: "bold", color: "#f87171", margin: "0 0 8px" }}>❌ Issues Found</p>
              {result.issues.map((issue, i) => (
                <p key={i} style={{ fontSize: 11, color: "#cfe0ff", margin: "0 0 4px", paddingLeft: 8 }}>• {issue}</p>
              ))}
            </div>
          )}

          {/* Missing Sections */}
          {result.missing_sections?.length > 0 && (
            <div style={{ marginBottom: 12, padding: 12, background: "rgba(250,204,21,0.07)", borderRadius: 10, border: "1px solid rgba(250,204,21,0.25)" }}>
              <p style={{ fontSize: 12, fontWeight: "bold", color: "#facc15", margin: "0 0 8px" }}>⚠️ Missing Sections</p>
              {result.missing_sections.map((s, i) => (
                <p key={i} style={{ fontSize: 11, color: "#cfe0ff", margin: "0 0 4px", paddingLeft: 8 }}>• {s}</p>
              ))}
            </div>
          )}

          {/* Suggestions */}
          {result.suggestions?.length > 0 && (
            <div style={{ marginBottom: 12, padding: 12, background: "rgba(33,150,243,0.08)", borderRadius: 10, border: "1px solid rgba(33,150,243,0.25)" }}>
              <p style={{ fontSize: 12, fontWeight: "bold", color: "#5badff", margin: "0 0 8px" }}>💡 Suggestions</p>
              {result.suggestions.map((s, i) => (
                <p key={i} style={{ fontSize: 11, color: "#cfe0ff", margin: "0 0 4px", paddingLeft: 8 }}>• {s}</p>
              ))}
            </div>
          )}

        </div>
      )}
    </div>
  );
};

export default CVChecker;