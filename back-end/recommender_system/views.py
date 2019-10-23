from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import UserActivity
from .serializers import UserActivitySerializer

# Create your views here.
@api_view(['GET'])
def user_activity_list(request):
    """
    List the activity log of all the users behaviour
    """
    user_activities = UserActivity.objects.all()
    serializer = UserActivitySerializer(user_activities, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def log_user_activity(request):
    """
    Log the particular user's behaviour of click, hower, add to wishlist
    """
    print(request.user)
    serializer = UserActivitySerializer(data=request.data)
    if(serializer.is_valid()):
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
