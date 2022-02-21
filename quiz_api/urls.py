from django.urls import path
from quiz_api.models import *
from quiz_api.serializers import *
from quiz_api.views import *

urlpatterns = [
    # Get all questions
    path('questions-list', GetListView.as_view(model=Question, resource_serializer=QuestionSerializer)),

    # Get details of a question using id OR create a new question
    path('questions/<int:pk>', ResourceAPIView.as_view(model=Question, resource_serializer=QuestionSerializer)),

     # Get details of an answer option using id OR create a new answer option
    path('answer-options/<int:pk>', ResourceAPIView.as_view(model=AnswerOption, resource_serializer=AnswerOptionSerializer)),

    # Get list of all answer options for a question
    path('answer-options-list/<int:qid>', AnswerOptionsListView.as_view(), name="answer-options-list"),

    # Get the correct answer for a question
    path('answer-options-correct/<int:qid>', CorrectAnswerView.as_view(), name="correct-answer")
]