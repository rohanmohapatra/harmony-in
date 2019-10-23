from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Property
from .serializers import PropertySerializer
# Create your views here.
@api_view(['GET', 'POST'])
def properties_list(request):
    """
    List all properties, or create a new property. 
    """
    print(type(request.user))
    if request.method == 'GET':
        properties = Property.objects.all()
        serializer = PropertySerializer(properties, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = PropertySerializer(data=request.data)
        if(serializer.is_valid()):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', ' PUT', 'DELETE'])
def property_detail(request, pk):
    """
    Retrieve, update or delete a property. 
    """
    print("Whats up "+str(pk))
    try:
        property = Property.objects.get(id=pk)
    except Property.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'GET':
        serializer = PropertySerializer(property)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = PropertySerializer(property, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        property.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
