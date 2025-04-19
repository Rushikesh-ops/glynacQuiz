from django.urls import path
from .views import *

urlpatterns = [
    path('employees/', EmployeeListAPIView.as_view()),
    path('summary/salary/', salary_summary , name='salary-summary'),
    path('summary/department/', department_count , name='department-count'),
    path('performance-summary/', performance_summary, name='performance-summary'),
    path('active-projects/', active_projects, name='active-projects'),
    path('salary-distribution/', salary_distribution_by_department, name='salary-distribution'),
    path('attendance-summary/', attendance_summary, name='attendance-summary'),
    path('salary-growth/', salary_growth, name='salary-growth'),
    path('employee-project-count/', employee_and_project_count, name='employee-project-count'),
    path('performance-by-department/', performance_by_department, name='performance-by-department'),
]
