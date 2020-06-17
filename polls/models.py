from django.db import models


class Election(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)
    date = models.DateField('date')

    class Meta:
        ordering = ['date', 'name',]

    def __str__(self):
        return f"{self.name}"


class Candidate(models.Model):
    election = models.ForeignKey(Election, blank=True, null=True, on_delete=models.CASCADE, related_name='candidates')
    f_name = models.CharField(max_length=60, blank=True, null=True)
    l_name = models.CharField(max_length=60, blank=True, null=True)
    profile_photo = models.ImageField(upload_to='polls', blank=True, null=True)

    class Meta: 
        ordering = ['f_name', 'l_name',]
    
    def __str__(self):
        return f"{self.f_name} {self.l_name}"


class Question(models.Model):
    number = models.PositiveIntegerField(
        'number', blank=True, null=True)
    question = models.TextField(max_length=1000, blank=True, null=True)

    class Meta:
        ordering = ['number', ]

    def __str__(self):
        return f"{self.question}"


class Response(models.Model):
    candidate = models.ForeignKey(Candidate, on_delete=models.CASCADE, related_name='responses')
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    response_id = models.PositiveIntegerField('response id', blank=True, null=True)
    response = models.CharField(max_length=255, blank=True, null=True)
    description = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        ordering = ['candidate', 'response_id',]
    
    def __str__(self):
        return f"{self.candidate}: {self.response}"
