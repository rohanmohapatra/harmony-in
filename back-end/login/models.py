from django.db import models

class user(models.Model):
    username=models.CharField(max_length=150)
    firstname=models.CharField(max_length=20)
    lastname=models.CharField(max_length=20)
    email=models.CharField(max_length=20)
    password=models.CharField(max_length=20)
    type=models.CharField(max_length=10)

    def __str__(self):
        return self.firstname

# Create your models here.
