from django.db import models
from datetime import date


class Election(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)
    date = models.DateField('date')
    description = models.TextField(max_length=1000, blank=True, null=True)

    class Meta:
        ordering = ['date', 'name',]

    def __str__(self):
        return f"{self.name}"


class Topic(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"{self.name}"


class Candidate(models.Model):
    PartyAssociation = models.TextChoices('PartyAssociation', 'Republican Democrat')
    election = models.ForeignKey(Election, blank=True, null=True, on_delete=models.CASCADE, related_name='candidates')
    f_name = models.CharField(max_length=60, blank=True, null=True)
    l_name = models.CharField(max_length=60, blank=True, null=True)
    profile_photo = models.ImageField(upload_to='polls/', blank=True, null=True)
    birth_date = models.DateField(blank=True, null=True, default=date.today)
    party = models.CharField(max_length=20, choices=PartyAssociation.choices, blank=True, null=True, default='')
    website = models.URLField(max_length=255, blank=True, null=True, default='')
    quote = models.TextField(max_length=255, blank=True, null=True, default='')
    
    class Meta: 
        ordering = ['f_name', 'l_name',]
    
    def full_name(self):
        return '%s %s' % (self.f_name, self.l_name)

    def calculate_age(self):
        # import datetime
        return int((date.today() - self.birth_date).days / 365.25)
    age = property(calculate_age)


class Endorsement(models.Model):
    candidate = models.ForeignKey(
        Candidate, blank=True, null=True, related_name='endorsements', on_delete=models.CASCADE)
    f_name = models.CharField(max_length=60, blank=True, null=True)
    l_name = models.CharField(max_length=60, blank=True, null=True)
    profile_photo = models.ImageField(
        upload_to='polls/', blank=True, null=True)

    class Meta:
        ordering = ['candidate', 'f_name', ]

    def full_name(self):
        return '%s %s' % (self.f_name, self.l_name)

    # def __str__(self):
    #     return f"{self.full_name} {self.candidate}"


class Question(models.Model):
    topic = models.TextField(max_length=255, blank=True, null=True, default='')
    number = models.PositiveIntegerField('number', blank=True, null=True)
    question = models.TextField(max_length=1000, blank=True, null=True)

    class Meta:
        ordering = ['number', ]

    def __str__(self):
        return f"{self.question}"


class Response(models.Model):
    candidate = models.ForeignKey(Candidate, on_delete=models.CASCADE, related_name='responses')
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    response_id = models.PositiveIntegerField('response id', blank=True, null=True)
    response = models.TextField(max_length=255, blank=True, null=True)
    description_heading = models.TextField(max_length=255, blank=True, null=True, default='')
    description = models.TextField(max_length=1000, blank=True, null=True)

    class Meta:
        ordering = ['response_id', 'candidate', ]
    
    def __str__(self):
        return f"{self.candidate}: {self.response}"


class RegisterToVote(models.Model):
    state = models.CharField(max_length=60, blank=True, null=True)
    state_abbr = models.CharField(max_length=3, blank=True, null=True)
    check_url = models.URLField(max_length=255, blank=True, null=True)
    register_url = models.URLField(max_length=255, blank=True, null=True)

    class Meta:
        ordering = ['state',]
    
    def __str__(self):
        return f"{self.state_abbr}"

