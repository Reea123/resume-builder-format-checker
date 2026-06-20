from django.contrib import admin
from .models import CV


@admin.register(CV)
class CVAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'name',
        'job_title',
        'email',
        'phone',
        'location',
        'template',
        'profile',
        'skills',
        'experience',
        'education',
        'projects',
        'created_at']
    list_filter = ['template', 'created_at']
    search_fields = ['name', 'email', 'phone']
    readonly_fields = ['created_at']

    fieldsets = (
        ('Basic Info', {
            'fields': ('name', 'job_title')
        }),
        ('Contact', {
            'fields': ('email', 'phone', 'location')
        }),
        ('Content', {
            'fields': ('profile', 'skills', 'experience', 'education', 'projects')
        }),
        ('Template & Date', {
            'fields': ('template', 'created_at')
        }),
    )