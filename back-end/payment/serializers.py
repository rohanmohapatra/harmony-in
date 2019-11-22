from rest_framework import serializers
from .models import Landlord

class LandlordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Landlord
        fields = "__all__"