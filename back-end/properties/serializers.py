from rest_framework import serializers
from .models import Property

class PropertySerializer(serializers.ModelSerializer):
    moreData = serializers.JSONField(required=False)    
    class Meta:
        model = Property
        fields = ["propId", "propertyName", "propertyAddress", "price", "bhk", "moreData"]
        depth = 1

