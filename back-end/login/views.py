from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from django.shortcuts import redirect
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from rest_framework import generics
from rest_framework.decorators import api_view
from . models import user
from . serializers import UserSerializerWithToken, UserSerializer
from . serializers import RegistrationSerializerWithToken, HarmonyUserSerializer
from django.contrib.auth import (
    authenticate,
    get_user_model,
    login,
    logout
)
from django.contrib.auth.models import User

'''
class userList(generics.CreateAPIView):
    serializer_class = registrationSerializer
    queryset = user.objects.all()

    @api_view(["POST"])
    def createuser(request):
        serializer = registrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            user = authenticate(username=serializer.data["username"], password=serializer.data["password"])
            if user is not None:
                return Response(status=status.HTTP_409_CONFLICT)
            else:
                user=User.objects.create_user(serializer.data["username"],serializer.data["email"],serializer.data["password"])
                user.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class loginView(generics.CreateAPIView):
    serializer_class = userSerializer
    queryset = user.objects.all()

    @api_view(["POST"])
    def loginuser(request):
        serializer = userSerializer(data=request.data)
        print("barf")
        if serializer.is_valid():
            username = serializer.data["username"]
            password = serializer.data["password"]
            user=authenticate(request,username=username, password=password)
            print("authenticated, username: {} and user:{} and password{}".format(username,user,password))
            if user is not None:
                login(request, user)
                print("logged in")
                return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

'''
def logoutuser(request):
    logout(request)
    return redirect('http://127.0.0.1:8000/login')

@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """
    
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




'''
Harmony.in User Views
'''
class HarmonyUserList(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = RegistrationSerializerWithToken(data=request.data)
        if serializer.is_valid():
            #print(serializer.data["username"])
            serializer.save()
            user = authenticate(username=serializer.data["username"], password=serializer.data["password"])
            print("authenticated, user:{} and password{}".format(serializer.data["username"],serializer.data["password"]))
            if user is not None:
                return Response(status=status.HTTP_409_CONFLICT)
            else:
                user=User.objects.create_user(serializer.data["username"],serializer.data["email"],serializer.data["password"])
                user.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def harmonyCurrentUser(request):
    """
    Determine the current user by their token, and return their data
    """
    
    serializer = HarmonyUserSerializer(request.user)
    return Response(serializer.data)