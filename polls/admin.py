from django.contrib import admin
from .models import Election, Candidate, Response, Question, RegisterToVote


@admin.register(Election)
class ElectionAdmin(admin.ModelAdmin):
    list_display = ('date', 'name',)

@admin.register(Candidate)
class CandidateAdmin(admin.ModelAdmin):
    list_display = ('election', 'f_name', 'l_name',)

@admin.register(Response)
class ResponseAdmin(admin.ModelAdmin):
    list_display = ('question_id', 'candidate', 'response',)

# @admin.register(Topic)
# class TopicAdmin(admin.ModelAdmin):
#     list_display = ('title', )

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('number', 'question',)

@admin.register(RegisterToVote)
class RegisterToVoteAdmin(admin.ModelAdmin):
    list_display = ('state',)
