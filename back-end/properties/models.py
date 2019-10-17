from django.db import models
from jsonfield import JSONField
import simplejson

# Create your models here.
class Property(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    propId = models.CharField(max_length=120)
    propertyName = models.CharField(max_length=120)
    propertyAddress = models.CharField(max_length=120)
    price = models.CharField(max_length=10)
    bhk = models.CharField(max_length=10)
#    moreData = JSONField()
    moreDataString = models.TextField(blank=True) # serialized custom data


    def __str__(self):
        return str(self.created) + " " + self.propId + " " + self.propertyName + " " + self.propertyAddress + " " + self.price + " " + self.bhk
