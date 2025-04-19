from django.core.management.base import BaseCommand
from analytics.models import *
from faker import Faker
from datetime import date, time
import random

class Command(BaseCommand):
    help = 'Seed sample employee data with Faker'

    def handle(self, *args, **kwargs):
        fake = Faker()

        # Clean previous data
        # SalaryHistory.objects.all().delete()
        # ProjectAssignment.objects.all().delete()
        # PerformanceReview.objects.all().delete()
        # Attendance.objects.all().delete()
        # Employee.objects.all().delete()

        # Create employees with Faker data
        employees = []
        for _ in range(5):  # 5 sample employees
            employee = Employee.objects.create(
                name=fake.name(),
                age=random.randint(22, 60),
                department=random.choice(["HR", "IT", "Finance", "Marketing"]),
                salary=round(random.uniform(30000, 120000), 2),
                join_date=fake.date_between(start_date='-10y', end_date='today')
            )
            employees.append(employee)

        # Attendance records (for the same date)
        for employee in employees:
            Attendance.objects.create(
                employee=employee,
                date="2025-04-18",
                status=random.choice(["Present", "Absent", "Leave"]),
                check_in=fake.time() if random.choice([True, False]) else None,
                check_out=fake.time() if random.choice([True, False]) else None,
                notes=fake.sentence() if random.choice([True, False]) else ""
            )

        # Performance reviews
        for employee in employees:
            PerformanceReview.objects.create(
                employee=employee,
                review_date="2025-03-31",
                reviewer=fake.name(),
                rating=round(random.uniform(1.0, 5.0), 1),
                strengths=fake.text(),
                improvements=fake.text(),
                comments=fake.text() if random.choice([True, False]) else ""
            )

        # Project assignments
        for employee in employees:
            ProjectAssignment.objects.create(
                employee=employee,
                project_name=fake.bs(),
                role=random.choice(["Frontend Developer", "Backend Developer", "Manager", "Content Lead"]),
                start_date=fake.date_this_year(),
                end_date=None,
                is_active=True
            )

        # Salary history
        for employee in employees:
            SalaryHistory.objects.create(
                employee=employee,
                effective_date="2025-01-01",
                base_salary=round(random.uniform(30000, 120000), 2),
                bonus=round(random.uniform(0, 10000), 2),
                remarks=fake.text() if random.choice([True, False]) else ""
            )

        self.stdout.write(self.style.SUCCESS("Sample employee data seeded with Faker!"))
