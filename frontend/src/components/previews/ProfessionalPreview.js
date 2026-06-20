import React from "react";

const ProfessionalPreview = ({ data }) => {
  return (
    <div className="pro-preview">
      {/* Dark Left Sidebar */}
      <div className="pro-left">
        <p className="pro-name">{data.name || "JOHN DOE"}</p>
        <p className="pro-role">{data.job_title || "Project Manager"}</p>

        <div className="pro-left-sec">
          <p className="pro-left-title">Contact</p>
          <p>📍 {data.location || "Your City"}</p>
          <p>📧 {data.email || "email@example.com"}</p>
          <p>📞 {data.phone || "+00 000 000 000"}</p>
        </div>

        <div className="pro-left-sec">
          <p className="pro-left-title">Skills</p>
          <p>{data.skills || "Team Project Manager\nLorem ipsum dolor..."}</p>
        </div>

        <div className="pro-left-sec">
          <p className="pro-left-title">Education</p>
          <p>{data.education || "B.Sc Computer Science"}</p>
        </div>
      </div>

      {/* White Right */}
      <div className="pro-right">
        <p className="pro-right-name">{data.name || "JOHN DOE"}</p>
        <p className="pro-right-role">{data.job_title || "Project Manager"}</p>

        {data.profile && (
          <div className="pro-right-sec">
            <p className="pro-right-title">Profile</p>
            <p>{data.profile}</p>
          </div>
        )}

        <div className="pro-right-sec">
          <p className="pro-right-title">Experience</p>
          <p>{data.experience || "• Team Project Manager\n• Lorem ipsum dolor sit amet..."}</p>
        </div>

        <div className="pro-right-sec">
          <p className="pro-right-title">Projects</p>
          <p>{data.projects || "• Project Coordinator\n• Lorem ipsum dolor sit amet..."}</p>
        </div>

        <div className="pro-right-sec">
          <p className="pro-right-title">Skills</p>
          <p>{data.skills || "Team Leadership, Budgeting, Agile..."}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalPreview;