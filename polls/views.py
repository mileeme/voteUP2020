from django.shortcuts import render, get_object_or_404
from django.urls import reverse
from .models import Election, Candidate, Question, Response, RegisterToVote, Endorsement


def index(request):
    election_list = Election.objects.all()
    candidate_list = Candidate.objects.all()
    endorsement_list = Endorsement.objects.all()
    question_list = Question.objects.all().order_by('number')
    response_list = Response.objects.all()
    registration_list = RegisterToVote.objects.all()
    template_name = 'polls/index.html'
    context = {
        'election_list': election_list,
        'candidate_list': candidate_list,
        'endorsement_list': endorsement_list,
        'question_list': question_list,
        'response_list': response_list,
        'registration_list': registration_list,
    }
    return render(request, template_name, context)
