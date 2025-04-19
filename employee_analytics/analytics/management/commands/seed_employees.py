from django.core.management.base import BaseCommand
from analytics.models import Employee
from faker import Faker
import random

class Command(BaseCommand):
    help = 'Seed employees'

    def handle(self, *args, **kwargs):
        fake = Faker()
        departments = ['Engineering', 'HR', 'Sales', 'Marketing', 'Finance']
        for _ in range(500):
            Employee.objects.create(
                name=fake.name(),
                age=random.randint(22, 60),
                department=random.choice(departments),
                salary=round(random.uniform(30000, 120000), 2),
                join_date=fake.date_between(start_date='-10y', end_date='today')
            )
        self.stdout.write(self.style.SUCCESS('500 Employees Seeded'))
