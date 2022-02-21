from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from quiz_api.models import *
from quiz_api.serializers import *

# Create your views here.
class ResourceAPIView(APIView):
    model = Question
    resource_serializer = QuestionSerializer

    def get(self, request, pk):
        try:
            resource_item = self.model.objects.get(pk=pk)
        except self.model.DoesNotExist:
            return Response({'message': 'The resource does not exist'}, status=status.HTTP_404_NOT_FOUND)
        serializer = self.resource_serializer(resource_item)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        if pk == 0:
            serializer = self.resource_serializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)
        else:
            try:
                resource_item = self.model.objects.get(pk=pk)
            except self.model.DoesNotExist:
                return Response({'message': 'The resource does not exist'}, status=status.HTTP_404_NOT_FOUND)
            serializer = self.resource_serializer(
                resource_item, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)

class GetListView(APIView):
    model = Question
    resource_serializer = QuestionSerializer

    def get(self, request):
        questions = self.model.objects.all()
        serializer = self.resource_serializer(questions, many=True)
        return Response(serializer.data)

class AnswerOptionsListView(APIView):
    def get(self, request, qid):
        try:
            question = Question.objects.get(pk=qid)
        except Question.DoesNotExist:
            return Response({'message': 'Question with the given ID does not exist.'}, status=status.HTTP_404_NOT_FOUND)
        serializer = AnswerOptionSerializer(question.options, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class CorrectAnswerView(APIView):
    def get(self, request, qid):
        try:
            question = Question.objects.get(pk=qid)
        except Question.DoesNotExist:
            return Response({'message': 'Question with the given ID does not exist.'}, status=status.HTTP_404_NOT_FOUND)
        serializer = AnswerOptionSerializer(question.answer)
        return Response(serializer.data, status=status.HTTP_200_OK)