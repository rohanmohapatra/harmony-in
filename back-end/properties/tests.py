from django.test import TestCase
from .models import Property

# Create your tests here.

class PropertyTestCase(TestCase):
    def setUp(self):
        Property.objects.create(propertyName="Dont know", price=100000, bhk=3)
        Property.objects.create(propertyName="Really Dont know", price=314314, bhk=314)

    def test_property_makes_propId(self):
        '''
        tests whether propId is proper generated
        '''
        self.assertEqual(len(Property.objects.all()), 2)
        prop = Property.objects.get(id=1)
        self.assertEqual(prop.propId, "prop00001")

