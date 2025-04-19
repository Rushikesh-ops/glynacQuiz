from django.core.management.base import BaseCommand
from analytics.models import *
from datetime import date, time

class Command(BaseCommand):
    help = 'Seed sample employee data including attendance, reviews, projects, and salary history'

    def handle(self, *args, **kwargs):
        # Clean previous demo data (optional)
        SalaryHistory.objects.all().delete()
        ProjectAssignment.objects.all().delete()
        PerformanceReview.objects.all().delete()
        Attendance.objects.all().delete()
        Employee.objects.all().delete()

        # Employees
        e1 = Employee.objects.create(name="Alice Singh", age=35, department="HR", salary=75000, join_date="2021-03-15")
        e2 = Employee.objects.create(name="Bob Verma", age=29, department="IT", salary=68000, join_date="2022-01-10")
        e3 = Employee.objects.create(name="Carol Mehta", age=32, department="Finance", salary=70000, join_date="2020-06-01")
        e4 = Employee.objects.create(name="Dave Kapoor", age=40, department="IT", salary=85000, join_date="2019-11-25")
        e5 = Employee.objects.create(name="Eva Rao", age=27, department="Marketing", salary=62000, join_date="2023-02-17")

        # Attendance
        Attendance.objects.create(employee=e1, date="2025-04-18", status="Present", check_in=time(9, 10), check_out=time(17, 40))
        Attendance.objects.create(employee=e2, date="2025-04-18", status="Leave", notes="Sick leave")
        Attendance.objects.create(employee=e3, date="2025-04-18", status="Present", check_in=time(9, 0), check_out=time(17, 0))
        Attendance.objects.create(employee=e4, date="2025-04-18", status="Present", check_in=time(10, 0), check_out=time(18, 0))
        Attendance.objects.create(employee=e5, date="2025-04-18", status="Present", check_in=time(9, 30), check_out=time(17, 30))

        # Performance Reviews
        PerformanceReview.objects.create(employee=e1, review_date="2025-03-31", reviewer="CEO", rating=4.5, strengths="Leadership", improvements="Time management")
        PerformanceReview.objects.create(employee=e2, review_date="2025-03-31", reviewer="CTO", rating=3.8, strengths="Problem solving", improvements="Communication")
        PerformanceReview.objects.create(employee=e3, review_date="2025-03-31", reviewer="CFO", rating=4.2, strengths="Analytical skills", improvements="Presentation")

        # Project Assignments
        ProjectAssignment.objects.create(employee=e2, project_name="Website Revamp", role="Frontend Dev", start_date="2025-01-15")
        ProjectAssignment.objects.create(employee=e4, project_name="Cloud Migration", role="DevOps Lead", start_date="2024-11-01")
        ProjectAssignment.objects.create(employee=e5, project_name="Brand Campaign", role="Content Lead", start_date="2025-02-01")

        # Salary History
        SalaryHistory.objects.create(employee=e1, effective_date="2025-01-01", base_salary=85000, bonus=5000)
        SalaryHistory.objects.create(employee=e2, effective_date="2025-01-01", base_salary=72000, bonus=3000)
        SalaryHistory.objects.create(employee=e3, effective_date="2025-01-01", base_salary=70000, bonus=2500)
        SalaryHistory.objects.create(employee=e4, effective_date="2025-01-01", base_salary=90000, bonus=6000)
        SalaryHistory.objects.create(employee=e5, effective_date="2025-01-01", base_salary=65000, bonus=2000)

        self.stdout.write(self.style.SUCCESS("✅ Sample employee data successfully seeded."))
