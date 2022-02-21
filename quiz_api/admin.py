from django.contrib import admin
from quiz_api.models import *

# Register your models here.
admin.site.register(Question)
admin.site.register(AnswerOption)