import React from "react";

const ModernPreview = ({ data }) => {
  return (
    <div className="modern-preview">
      {/* Blue Header */}
      <div className="modern-header">
        <table width="100%" style={{ borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              <td width="60" style={{ verticalAlign: "middle" }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 4,
                  background: "#aac4e0", border: "2px solid #fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 9, color: "#fff"
                }}>Photo</div>
              </td>
              <td style={{ verticalAlign: "middle", paddingLeft: 12 }}>
                <h1>{data.name || "JOHN DOE"}</h1>
                <p className="role">{data.job_title || "Web Developer"}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Body */}
      <div className="modern-body">
        {/* Left */}
        <div className="modern-left">
          <div className="modern-sec">
            <p className="modern-sec-title">Contact</p>
            <p className="modern-contact-item">📍 {data.location || "Your City"}</p>
            <p className="modern-contact-item">📧 {data.email || "email@example.com"}</p>
            <p className="modern-contact-item">📞 {data.phone || "+00 000 000 000"}</p>
          </div>
          <div className="modern-sec">
            <p className="modern-sec-title">Skills</p>
            <p>{data.skills || "Python, React, SQL, GitHub"}</p>
          </div>
          <div className="modern-sec">
            <p className="modern-sec-title">Education</p>
            <p>{data.education || "B.Sc Computer Science"}</p>
          </div>
        </div>

        {/* Right */}
        <div className="modern-right">
          {data.profile && (
            <div className="modern-sec">
              <p className="modern-sec-title">Profile</p>
              <p>{data.profile}</p>
            </div>
          )}
          <div className="modern-sec">
            <p className="modern-sec-title">Experience</p>
            <p>{data.experience || "Senior Project Manager\nLorem ipsum dolor sit amet..."}</p>
          </div>
          <div className="modern-sec">
            <p className="modern-sec-title">Projects</p>
            <p>{data.projects || "Senior Project Manager\nLorem ipsum..."}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernPreview;