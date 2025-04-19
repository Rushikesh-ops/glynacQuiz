from django.db import models

class Employee(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    department = models.CharField(max_length=50)
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    join_date = models.DateField()

    def __str__(self):
        return self.name

class Attendance(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    date = models.DateField()
    status = models.CharField(max_length=10, choices=[("Present", "Present"), ("Absent", "Absent"), ("Leave", "Leave")])
    check_in = models.TimeField(null=True, blank=True)
    check_out = models.TimeField(null=True, blank=True)
    notes = models.TextField(blank=True)

    class Meta:
        unique_together = ('employee', 'date')


class PerformanceReview(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    review_date = models.DateField()
    reviewer = models.CharField(max_length=100)
    rating = models.FloatField()  # 0.0 - 5.0 scale
    strengths = models.TextField()
    improvements = models.TextField()
    comments = models.TextField(blank=True)


class ProjectAssignment(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    project_name = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    is_active = models.BooleanField(default=True)


class SalaryHistory(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    effective_date = models.DateField()
    base_salary = models.DecimalField(max_digits=10, decimal_places=2)
    bonus = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    remarks = models.TextField(blank=True)