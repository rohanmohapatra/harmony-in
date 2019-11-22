from django.db import models

# Create your models here.

# Create your models here.
class Landlord(models.Model):
    email = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    account_no = models.CharField(max_length=100)
    ifsc_code = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=100)
    rent_amount = models.IntegerField()


    def __str__(self):
        return str(self.email) + " " + str(self.name)
