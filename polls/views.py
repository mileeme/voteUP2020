from django.shortcuts import render, get_object_or_404
from django.urls import reverse
from .models import Candidate, Question, Response


def index(request):
    response_list = Response.objects.all()
    question_list = Question.objects.all().order_by('number')
    template_name = 'polls/index.html'
    context = {
        'response_list': response_list,
        'question_list': question_list,
    }
    return render(request, template_name, context)
