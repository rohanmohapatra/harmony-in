from django.shortcuts import render
from .models import Landlord
from .serializers import LandlordSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status, generics, permissions
# Create your views here.

import stripe

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def add_landlord(request):
    """
    Add A Landlord and details
    """

    serializer = LandlordSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def stripe_create_checkout_session(request):
    stripe.api_key = 'sk_test_a93sjfg5VrDgKwE3Qd6mM8HU00OGol35p5'
    try:
        landlord = Landlord.objects.get(email=request.data["email"])
    except Landlord.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)

    print(landlord)
    stripe_line_item = {
        'name': "Paying for " + landlord.name,
        'description': "Paying to Harmony.in",
        'amount': landlord.rent_amount*100,
        'currency': 'inr',
        'quantity': 1,
    }
    session = stripe.checkout.Session.create(
        payment_method_types=['card'],
        line_items=[stripe_line_item],
        success_url='http://localhost:8000/payment/success',
        cancel_url='http://localhost:8000/payment/success',
    )
    return Response(session.stripe_id)