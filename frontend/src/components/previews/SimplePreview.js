import React from "react";

const SimplePreview = ({ data }) => {
  return (
    <div className="simple-preview">
      <h1>{data.name || "JOHN DOE"}</h1>
      {data.job_title && <p className="sub-title">{data.job_title}</p>}
      <hr className="name-line" />
      <p className="contact-row">
        {[data.email, data.phone, data.location].filter(Boolean).join("  |  ") || "email@example.com  |  +00 000 000 000"}
      </p>

      {data.profile && (
        <div>
          <p className="sec-title">Profile</p>
          <hr className="sec-divider" />
          <p className="sec-content">{data.profile}</p>
        </div>
      )}

      <div>
        <p className="sec-title">Skills</p>
        <hr className="sec-divider" />
        <ul>
          {(data.skills || "Python\nReact\nSQL\nCommunication")
            .split(/[\n,]/)
            .map((s, i) => s.trim() && <li key={i}>{s.trim()}</li>)}
        </ul>
      </div>

      <div>
        <p className="sec-title">Experience</p>
        <hr className="sec-divider" />
        <p className="sec-content">
          {data.experience || "Senior Developer  Tech Corp\n• Led a team of developers on mission-critical projects\n• Improved application performance by 30%"}
        </p>
      </div>

      <div>
        <p className="sec-title">Education</p>
        <hr className="sec-divider" />
        <p className="sec-content">{data.education || "B.Sc Computer Science"}</p>
      </div>

      {data.projects && (
        <div>
          <p className="sec-title">Projects</p>
          <hr className="sec-divider" />
          <p className="sec-content">{data.projects}</p>
        </div>
      )}
    </div>
  );
};

export default SimplePreview;