import React from "react";
import TemplateCard from "./TemplateCard";

const templates = [
  {
    id: "simple",
    name: "Simple",
    img: "/templates/simple.png",
    description: "Clean & minimal",
  },
  {
    id: "modern",
    name: "Modern",
    img: "/templates/modern.png",
    description: "Bold & professional",
  },
  {
    id: "professional",
    name: "Professional",
    img: "/templates/professional.png",
    description: "Dark sidebar style",
  },
  {
    id: "creative",
    name: "Creative",
    img: "/templates/creative.png",
    description: "Colorful & unique",
  },
];

const TemplateList = ({ selectedTemplate, setSelectedTemplate }) => {
  return (
    <div className="sidebar">
      <h3>Templates</h3>
      <p className="sidebar-subtitle">Choose a style</p>

      <div className="template-grid">
        {templates.map((t) => (
          <TemplateCard
            key={t.id}
            template={t}
            isActive={selectedTemplate === t.id}
            onSelect={setSelectedTemplate}
          />
        ))}
      </div>
    </div>
  );
};

export default TemplateList;