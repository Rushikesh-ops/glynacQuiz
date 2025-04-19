from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from .serializers import *
from django.db.models import Avg, Max, Min, Count
from datetime import date, timedelta
from rest_framework.pagination import PageNumberPagination

# Employee List with Pagination
class EmployeePagination(PageNumberPagination):
    page_size = 5  # Customize the page size as needed
    page_size_query_param = 'page_size'
    max_page_size = 100

class EmployeeListAPIView(generics.ListAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    pagination_class = EmployeePagination

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


# Performance Summary (average rating)
@api_view(['GET'])
def performance_summary(request):
    performance_data = PerformanceReview.objects.aggregate(
        avg_rating=Avg('rating')
    )
    return Response(performance_data)

# Active Projects Summary (count of active projects)
@api_view(['GET'])
def active_projects(request):
    active_projects_count = ProjectAssignment.objects.filter(is_active=True).count()
    return Response({'active_projects': active_projects_count})

# Salary Distribution by Department (average salary per department)
@api_view(['GET'])
def salary_distribution_by_department(request):
    department_salary_data = Employee.objects.values('department').annotate(avg_salary=Avg('salary'))
    return Response(department_salary_data)

# Attendance Summary for the Last 30 Days (Present/Absent/Leave count)
@api_view(['GET'])
def attendance_summary(request):
    today = date.today()
    thirty_days_ago = today - timedelta(days=30)
    attendance_data = Attendance.objects.filter(date__gte=thirty_days_ago).values('status').annotate(total=Count('id'))
    return Response(attendance_data)

# Employee Salary Growth (compare current salary with initial salary)
@api_view(['GET'])
def salary_growth(request):
    growth_data = Employee.objects.annotate(
        initial_salary=Max('salaryhistory__base_salary')
    ).values('name', 'initial_salary', 'salary')
    
    return Response(growth_data)

# Employee and Project Count (projects assigned to each employee)
@api_view(['GET'])
def employee_and_project_count(request):
    data = Employee.objects.annotate(project_count=Count('projectassignment')).values('name', 'project_count')
    return Response(data)

# Performance Reviews by Department (average rating by department)
@api_view(['GET'])
def performance_by_department(request):
    department_performance = PerformanceReview.objects.values('employee__department').annotate(
        avg_rating=Avg('rating')
    )
    return Response(department_performance)