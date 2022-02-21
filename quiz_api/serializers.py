from quiz_api.models import *
from rest_framework import serializers

class QuestionSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        return Question.objects.create(**validated_data)

    def update(self, instance, validated_data):
        return super().update(instance, validated_data)

    class Meta:
        model = Question
        fields = '__all__'
        depth = 1

class AnswerOptionSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        return AnswerOption.objects.create(**validated_data)

    def update(self, instance, validated_data):
        return super().update(instance, validated_data)

    class Meta:
        model = AnswerOption
        fields = '__all__'