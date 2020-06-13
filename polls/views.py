from django.shortcuts import render, get_object_or_404
from django.urls import reverse
from .models import Candidate, Question, Response


def index(request):
    response_list = Response.objects.all()
    trump_response = Response.objects.filter(candidate__f_name='Donald')
    print(trump_response)
    template_name = 'polls/index.html'
    context = {
        'response_list': response_list,
        'trump_response': trump_response,
    }
    return render(request, template_name, context)
