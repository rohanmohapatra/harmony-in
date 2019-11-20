from django.db import models

# Create your models here.

# Create your models here.
class Cart(models.Model):
    user = models.CharField(max_length=100)
    propertyId = models.CharField(max_length=100)


    def __str__(self):
        return str(self.user) + " " + str(self.propertyId)
