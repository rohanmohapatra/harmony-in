# Create your views here.

from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.http import require_POST
from properties.models import Property
from django.contrib.auth.models import user

class Cart(object):
    def __init__(self, request):
        self.session = request.session
        cart = self.session.get(settings.CART_SESSION_ID)
        if not cart:
            cart = self.session[settings.CART_SESSION_ID] = {}
        self.cart = cart

    def add(self, prop):
        prop_id = str(prop.id)
        if prop_id not in self.cart:
            self.cart[prop_id] = {'user': cart.user, 'price': str(prop.price)}
        else:
            pass
        self.save()

    def save(self):
        self.session[settings.CART_SESSION_ID] = self.cart
        self.session.modified = True

    def remove(self, prop,user):
        prop_id = str(prop.id)
        if prop_id in self.cart:
            del self.cart[prop_id]
            self.save()

    def __iter__(self):
        prop_ids = self.cart.keys()
        props = Property.objects.filter(id__in=prop_ids)
        for prop in props:
            self.cart[str(prop.id)]['prop'] = prop

    def clear(self):
        del self.session[settings.CART_SESSION_ID]
        self.session.modified = True


@require_POST
def add(request, prop_id):
    cart = Cart(request)
    prop = get_object_or_404(Property, id=prop_id) 
	 cart.add(prop)
    return redirect('cart:cart_page')


def remove(request, prop_id):
    cart = Cart(request)
    prop = get_object_or_404(Property, id=prop_id)
    cart.remove(prop,cart.user)
    return redirect('cart:cart_page')


def display(request):
    cart = Cart(request)
    return render(request, 'cart_page.html', {'cart': cart})	
