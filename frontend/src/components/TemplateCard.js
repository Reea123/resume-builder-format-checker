import React from "react";

const TemplateCard = ({ template, isActive, onSelect }) => {
  return (
    <div
      className={`template-card ${isActive ? "active" : ""}`}
      onClick={() => onSelect(template.id)}
    >
      {/* Template Preview Image */}
      <div className="card-img-wrapper">
        <img src={template.img} alt={template.name} />

        {/* Hover Overlay */}
        <div className="overlay">
          <span>Use Template</span>
        </div>

        {/* Active Badge */}
        {isActive && (
          <div className="active-badge">✓ Selected</div>
        )}
      </div>

      {/* Template Name */}
      <p className={`card-label ${isActive ? "active-label" : ""}`}>
        {template.name}
      </p>
    </div>
  );
};

export default TemplateCard;