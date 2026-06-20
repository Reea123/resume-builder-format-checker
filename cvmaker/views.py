from rest_framework.decorators import api_view
from django.http import HttpResponse, JsonResponse
from django.template.loader import render_to_string
from .models import CV

from xhtml2pdf import pisa
from io import BytesIO
import traceback
import re

try:
    import pdfplumber
    PDF_LIB = "pdfplumber"
except ImportError:
    try:
        import PyPDF2
        PDF_LIB = "PyPDF2"
    except ImportError:
        PDF_LIB = None


@api_view(['POST'])
def generate_cv(request):
    try:
        data = request.data
        print("📥 Received data:", dict(data))

        cv = CV.objects.create(
            name=data.get("name", ""),
            job_title=data.get("job_title", ""),
            email=data.get("email", ""),
            phone=data.get("phone", ""),
            location=data.get("location", ""),
            profile=data.get("profile", ""),
            skills=data.get("skills", ""),
            experience=data.get("experience", ""),
            education=data.get("education", ""),
            projects=data.get("projects", ""),
            template=data.get("template", "simple"),
        )

        template_name = data.get("template") or "simple"

        context = {
            "name":       cv.name,
            "job_title":  cv.job_title,
            "email":      cv.email,
            "phone":      cv.phone,
            "location":   cv.location,
            "profile":    cv.profile,
            "skills":     cv.skills,
            "experience": cv.experience,
            "education":  cv.education,
            "projects":   cv.projects,
        }

        html_string = render_to_string(
            f"cv_templates/{template_name}.html",
            context
        )

        buffer = BytesIO()
        pisa_status = pisa.CreatePDF(html_string, dest=buffer)

        if pisa_status.err:
            return HttpResponse(f"PDF generation failed: {pisa_status.err}", status=500)

        pdf = buffer.getvalue()
        buffer.close()

        return HttpResponse(pdf, content_type='application/pdf')

    except Exception as e:
        print("🔥 ERROR:", traceback.format_exc())
        return HttpResponse(f"Error: {str(e)}", status=500)


def extract_text_from_pdf(pdf_file):
    """Extract text from uploaded PDF using available library."""
    text = ""

    if PDF_LIB == "pdfplumber":
        import pdfplumber
        with pdfplumber.open(pdf_file) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"

    elif PDF_LIB == "PyPDF2":
        import PyPDF2
        reader = PyPDF2.PdfReader(pdf_file)
        for page in reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"

    else:
        raise Exception("No PDF library installed. Run: pip install pdfplumber")

    return text


@api_view(['POST'])
def check_cv(request):
    try:
        pdf_file = request.FILES.get("cv_file")
        if not pdf_file:
            return JsonResponse({"error": "No file uploaded"}, status=400)

        # Extract text from PDF
        text = extract_text_from_pdf(pdf_file)
        text_lower = text.lower()
        word_count = len(text.split())

        issues = []
        suggestions = []
        missing_sections = []
        strengths = []
        score = 100

        # --- Check Contact Info ---
        has_email = bool(re.search(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}', text))
        has_phone = bool(re.search(r'(\+?\d{1,3}[-.\s]?)?\(?\d{3,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}', text))

        if has_email:
            strengths.append("Email address found")
        else:
            issues.append("No email address found")
            missing_sections.append("Contact Email")
            score -= 15

        if has_phone:
            strengths.append("Phone number found")
        else:
            issues.append("No phone number found")
            missing_sections.append("Contact Phone")
            score -= 10

        # --- Check Section Headers ---
        sections = {
            "experience": ["experience", "work history", "employment"],
            "education": ["education", "academic", "qualification"],
            "skills": ["skills", "technical skills", "competencies"],
            "profile/summary": ["profile", "summary", "objective", "about"],
            "projects": ["projects", "portfolio"],
        }

        for section_name, keywords in sections.items():
            found = any(kw in text_lower for kw in keywords)
            if found:
                strengths.append(f"{section_name.title()} section present")
            else:
                missing_sections.append(section_name.title())
                score -= 8

        # --- Check Length ---
        if word_count < 100:
            issues.append("CV content is too short — add more details")
            score -= 15
        elif word_count > 1000:
            issues.append("CV is very long — consider trimming to 1-2 pages")
            score -= 5
        else:
            strengths.append(f"Good content length ({word_count} words)")

        # --- Check for action verbs ---
        action_verbs = ["led", "developed", "managed", "created", "built", "designed",
                        "improved", "increased", "implemented", "achieved", "delivered"]
        verb_count = sum(1 for verb in action_verbs if verb in text_lower)

        if verb_count >= 3:
            strengths.append("Uses strong action verbs")
        else:
            suggestions.append("Use more action verbs like 'developed', 'led', 'achieved' to describe your experience")
            score -= 5

        # --- Check for numbers/metrics ---
        has_numbers = bool(re.search(r'\d+%|\d+\+|\$\d+', text))
        if has_numbers:
            strengths.append("Includes quantifiable achievements")
        else:
            suggestions.append("Add measurable achievements (e.g. 'increased efficiency by 30%')")
            score -= 5

        # --- Check for common formatting issues ---
        if text.count('\n\n\n') > 3:
            issues.append("Excessive blank lines detected — clean up spacing")
            score -= 3

        if len(re.findall(r'[A-Z]{4,}', text)) > 10:
            suggestions.append("Avoid excessive use of ALL CAPS text")

        # --- General suggestions ---
        if "linkedin" not in text_lower:
            suggestions.append("Consider adding your LinkedIn profile link")

        if score < 0:
            score = 0
        if score > 100:
            score = 100

        # Overall message
        if score >= 80:
            overall = "Great CV! Just a few minor improvements needed."
        elif score >= 60:
            overall = "Good foundation, but some important sections need attention."
        else:
            overall = "Your CV needs significant improvements to stand out."

        result = {
            "score": score,
            "overall": overall,
            "issues": issues if issues else ["No major issues found!"],
            "suggestions": suggestions if suggestions else ["Your CV looks well structured!"],
            "missing_sections": missing_sections if missing_sections else [],
            "strengths": strengths if strengths else [],
        }

        return JsonResponse(result)

    except Exception as e:
        print("🔥 ERROR:", traceback.format_exc())
        return JsonResponse({"error": str(e)}, status=500)