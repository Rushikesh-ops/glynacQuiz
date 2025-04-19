from django.urls import path
from .views import EmployeeListAPIView, salary_summary, department_count

urlpatterns = [
    path('employees/', EmployeeListAPIView.as_view()),
    path('summary/salary/', salary_summary),
    path('summary/department/', department_count),
]
