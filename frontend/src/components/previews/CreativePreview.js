import React from "react";

const CreativePreview = ({ data }) => {
  const leftStyle = {
    width: "34%",
    background: "#2ec4a0",
    padding: "20px 16px 20px 18px",
    verticalAlign: "top",
  };

  const rightStyle = {
    width: "66%",
    background: "#fff",
    verticalAlign: "top",
    padding: 0,
  };

  const sectionTitleLeft = {
    fontSize: 13,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 2,
    color: "#fff",
    marginBottom: 8,
    paddingBottom: 5,
    borderBottom: "1px solid rgba(255,255,255,0.5)",
  };

  const textLeft = {
    fontSize: 13,
    color: "rgba(255,255,255,0.95)",
    lineHeight: 1.8,
    marginBottom: 5,
  };

  const sectionTitleRight = {
    fontSize: 13,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 2,
    color: "#2ec4a0",
    borderBottom: "2px solid #2ec4a0",
    paddingBottom: 5,
    marginBottom: 10,
  };

  const textRight = { fontSize: 13, color: "#444", lineHeight: 1.8, marginBottom: 20 };

  return (
    <div style={{ display: "flex", minHeight: 842, fontFamily: "Arial, sans-serif" }}>

      {/* LEFT */}
      <div style={leftStyle}>
        {/* Photo */}
        <div style={{
          width: 70, height: 70, border: "3px solid #fff",
          background: "rgba(255,255,255,0.3)", margin: "0 auto 20px",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 11, color: "#fff"
        }}>Photo</div>

        <p style={sectionTitleLeft}>Skills</p>
        <p style={textLeft}>{data.skills || "Python, React, SQL"}</p>

        <p style={sectionTitleLeft}>Education</p>
        <p style={textLeft}>{data.education || "B.Sc Computer Science"}</p>

        <p style={sectionTitleLeft}>Contact</p>
        <p style={textLeft}>@ {data.email || "email@example.com"}</p>
        <p style={textLeft}># {data.phone || "+00 000 000 000"}</p>
        <p style={textLeft}>* {data.location || "Your City"}</p>
      </div>

      {/* RIGHT */}
      <div style={rightStyle}>
        {/* Colored bar */}
        <div style={{ display: "flex", height: 14 }}>
          <div style={{ flex: 1, background: "#fff" }}></div>
          <div style={{ width: 80, background: "#e05c5c" }}></div>
          <div style={{ width: 120, background: "#f5c842" }}></div>
        </div>

        {/* Content */}
        <div style={{ padding: "20px 28px 28px 24px" }}>
          <p style={{ fontSize: 28, fontWeight: 900, color: "#1a1a1a", margin: "0 0 5px" }}>
            {data.name || "Your Name"}
          </p>
          <p style={{ fontSize: 13, color: "#2ec4a0", fontWeight: "bold", textTransform: "uppercase", letterSpacing: 2, margin: "0 0 20px" }}>
            {data.job_title || "Creative Professional"}
          </p>

          <p style={sectionTitleRight}>Profile</p>
          <p style={textRight}>{data.profile || "Creative and driven professional..."}</p>

          <p style={sectionTitleRight}>Experience</p>
          <p style={textRight}>{data.experience || "Senior Developer at Tech Corp..."}</p>

          <p style={sectionTitleRight}>Projects</p>
          <p style={textRight}>{data.projects || "CV Generator App..."}</p>

          <p style={sectionTitleRight}>Content Creator</p>
          <p style={{ fontSize: 13, color: "#444", lineHeight: 1.8 }}>
            Enthusiastic about building and sharing knowledge through creative mediums and collaborative projects.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreativePreview;