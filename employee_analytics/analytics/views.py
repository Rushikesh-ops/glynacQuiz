from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Employee
from .serializers import EmployeeSerializer
from django.db.models import Avg, Max, Min, Count

class EmployeeListAPIView(generics.ListAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

@api_view(['GET'])
def salary_summary(request):
    summary = Employee.objects.aggregate(
        avg_salary=Avg('salary'),
        max_salary=Max('salary'),
        min_salary=Min('salary')
    )
    return Response(summary)

@api_view(['GET'])
def department_count(request):
    data = Employee.objects.values('department').annotate(total=Count('id'))
    return Response(data)
