# resume-builder-format-checker
Full-stack resume builder with 10 live-preview templates, instant PDF export, and a rule-based CV checker — built with Django REST Framework, React, xhtml2pdf, and pdfplumber. Stores resumes in a database with a custom admin panel for management.

CV Dashboard — Resume Builder & CheckerCV Dashboard — Resume Builder & Checker
A full-stack web application for building, previewing, and downloading professional resumes, plus checking existing resumes for formatting and content quality. Built with Django REST Framework + React.
Features

10 Resume Templates — Simple, Modern, Professional, Creative, and 6 additional themed designs
Live Preview — React components mirror the PDF output exactly as you type
PDF Export — Server-side HTML-to-PDF conversion via xhtml2pdf
CV Checker — Upload any PDF resume and get a score (0–100) with feedback on missing sections, weak action verbs, and formatting issues — powered by pdfplumber, no paid AI API required
Database Storage — Every generated resume is saved with full structured data (name, contact, skills, experience, education, projects)
Django Admin — Browse and manage all saved resumes with organized fieldsets
Custom UI — Gradient blue-black themed interface

Tech Stack
LayerTechBackendPython, Django, Django REST FrameworkFrontendReact, custom CSSPDF Generationxhtml2pdfPDF Text ExtractionpdfplumberDatabaseSQLite (Django ORM)

How It Works

User fills in resume details in the form
React renders a live preview matching the selected template
On download, Django renders the matching HTML template and converts it to PDF with xhtml2pdf
The resume data is saved to the database
Users can also upload an existing resume PDF — pdfplumber extracts the text, and a rule-based checker scores it and returns actionable feedback
