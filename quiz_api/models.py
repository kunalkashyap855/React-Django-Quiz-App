from django.db import models

# Create your models here.
class AnswerOption(models.Model):
    text = models.CharField(max_length=100)

    def __str__(self):
        return self.text

class Question(models.Model):
    text = models.CharField(max_length=200)
    options = models.ManyToManyField(
        AnswerOption, related_name="answer_options")
    answer = models.ForeignKey(AnswerOption, on_delete=models.CASCADE)

    def __str__(self):
        return self.text