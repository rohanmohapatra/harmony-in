from django.shortcuts import render
from django.http import JsonResponse
from .models import Property
from .serializers import PropertySerializer
from login.serializers import  HarmonyUserSerializer
from rest_framework import status, generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django_filters import rest_framework as filters


# Create your views here.
@api_view(['GET', 'POST'])
@permission_classes([permissions.AllowAny])
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
        if (serializer.is_valid()):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def propId_list(request):
    """
    List all propIds. 
    """
    permission_classes = (permissions.AllowAny,)
    propIds = ["prop" + str(id).zfill(5) for id in list(Property.objects.values_list('id', flat=True))]
    return Response(propIds)


@api_view(['GET', ' PUT', 'DELETE'])
def property_detail(request, pk):
    """
    Retrieve, update or delete a property. 
    """
    print("Whats up " + str(pk))
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

@api_view(['GET'])
def properties_owned_by_user(request):
    """
    Retrieves the properties owned by the request user
    """
    seller = HarmonyUserSerializer(request.user)
    print(seller.data)
    seller_name = seller.data["username"]
    seller_properties = Property.objects.filter(user=seller_name)
    serializer = PropertySerializer(seller_properties, many=True)
    return Response(serializer.data)


class PropertyFilter(filters.FilterSet):
    societyName = filters.CharFilter(field_name='societyName', lookup_expr='icontains')
    propertyName = filters.CharFilter(field_name='propertyName', lookup_expr='icontains')
    propertyAddress = filters.CharFilter(field_name='propertyAddress', lookup_expr='icontains')
    city = filters.CharFilter(field_name="city")
    min_price = filters.NumberFilter(field_name="price", lookup_expr='gte')
    max_price = filters.NumberFilter(field_name="price", lookup_expr='lte')
    min_bhk = filters.NumberFilter(field_name="bhk", lookup_expr="gte")
    max_bhk = filters.NumberFilter(field_name="bhk", lookup_expr="lte")

    class Meta:
        model = Property
        fields = ['societyName', 'propertyName', 'propertyAddress', 'city', 'max_price', 'min_price', 'min_bhk',
                  'max_bhk']


'''
class PropertyList(generics.ListAPIView):
    serializer_class = PropertySerializer

    def get_queryset(self):
        """
        This view returns the properties based upoun the filter
        """
'''


class PropertyList(generics.ListAPIView):
    """
    This view returns that properties based upon the filters provided
    """
    permission_classes = (permissions.AllowAny,)
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = PropertyFilter
