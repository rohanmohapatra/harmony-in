from django.db import models
from jsonfield import JSONField
import simplejson

# Create your models here.
class Property(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    propertyName = models.CharField(max_length=120, blank=True)
    propertyAddress = models.CharField(max_length=120, blank=True)
    price = models.IntegerField()
    bhk = models.IntegerField()
    societyName = models.CharField(max_length=100)
    username = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    propertyType = models.CharField(max_length=100, blank=True, null=True)
    moreData = JSONField()

    @property
    def propId(self):
        return "prop" + str(self.id).zfill(5)

    def __str__(self):
        return str(self.created) + " " + str(self.id)# + " " + str(self.price) + " " + str(self.bhk)

