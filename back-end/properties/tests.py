from django.test import TestCase
from .models import Property

# Create your tests here.

class PropertyTestCase(TestCase):
    def setup(self):
        p = Property(propertyName="Dont know")
        p.save()

    def test_property_makes_propId(self):
        '''
        tests whether propId is proper generated
        '''
        # prop = Property.objects.get(id=1)
        self.assertEqual(len(Property.objects.all()), 0)
