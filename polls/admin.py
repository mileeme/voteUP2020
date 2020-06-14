from django.contrib import admin
from .models import Candidate, Response, Question


@admin.register(Candidate)
class CandidateAdmin(admin.ModelAdmin):
    list_display = ('f_name', 'l_name',)

@admin.register(Response)
class ResponseAdmin(admin.ModelAdmin):
    list_display = ('question', 'candidate', 'response',)

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('number', 'question')
