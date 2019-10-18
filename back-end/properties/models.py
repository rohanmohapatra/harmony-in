from django.db import models
from jsonfield import JSONField
import simplejson

# Create your models here.
class Property(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    propertyName = models.CharField(max_length=120, blank=True, null=True)
    propertyAddress = models.CharField(max_length=120, blank=True, null=True)
    price = models.CharField(max_length=20)
    bhk = models.CharField(max_length=20)
    societyName = models.CharField(max_length=100)
    moreData = JSONField()

    @property
    def propId(self):
        return "prop" + str(self.id).zfill(5)

    def __str__(self):
        return str(self.created) + " " + self.propertyName + " " + self.propertyAddress + " " + self.price + " " + self.bhk

