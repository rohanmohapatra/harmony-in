from django.db import models
from jsonfield import JSONField
import simplejson

# Create your models here.
class Property(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    propertyName = models.CharField(max_length=120)
    propertyAddress = models.CharField(max_length=120)
    price = models.CharField(max_length=10)
    bhk = models.CharField(max_length=10)
    moreData = JSONField()

    @property
    def propId(self):
        return "prop" + str(self.id).zfill(5)

    def __str__(self):
        return str(self.created) + " " + self.propertyName + " " + self.propertyAddress + " " + self.price + " " + self.bhk

