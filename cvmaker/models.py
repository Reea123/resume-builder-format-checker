from django.db import models


class CV(models.Model):
    # Basic Info
    name = models.CharField(max_length=100)
    job_title = models.CharField(max_length=100, blank=True, default="")

    # Contact
    email = models.EmailField(blank=True, default="")
    phone = models.CharField(max_length=20, blank=True, default="")
    location = models.CharField(max_length=100, blank=True, default="")

    # Content
    profile = models.TextField(blank=True, default="")
    skills = models.TextField(blank=True, default="")
    experience = models.TextField(blank=True, default="")
    education = models.TextField(blank=True, default="")
    projects = models.TextField(blank=True, default="")

    # Template
    template = models.CharField(max_length=50, default="simple")

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.template} - {self.created_at.strftime('%d/%m/%Y')}"