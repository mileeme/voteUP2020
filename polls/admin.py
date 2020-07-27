from django.contrib import admin
from .models import Election, Candidate, Response, Question, RegisterToVote, Topic, Endorsement


@admin.register(Endorsement)
class EndorsementAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'candidate',)
    model = Endorsement

@admin.register(Candidate)
class CandidateAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'age')

@admin.register(Response)
class ResponseAdmin(admin.ModelAdmin):
    list_display = ('question_id', 'candidate', 'response', 'description_heading')

@admin.register(Topic)
class TopicAdmin(admin.ModelAdmin):
    list_display = ('name', )

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('number', 'question',)

@admin.register(RegisterToVote)
class RegisterToVoteAdmin(admin.ModelAdmin):
    list_display = ('state',)

@admin.register(Election)
class ElectionAdmin(admin.ModelAdmin):
    list_display = ('date', 'name',)
