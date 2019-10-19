from rest_framework import serializers
from . models import user

class registrationSerializer(serializers.ModelSerializer):
    class Meta:
        model=user
        fields="__all__"
class userSerializer(serializers.ModelSerializer):
    class Meta:
        model=user
        fields=["username","password"]