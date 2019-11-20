"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from properties import views as prop_views
from login import views
from recommender_system import views as rec_views 
from rest_framework_jwt.views import obtain_jwt_token
from cart import views as cart_views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/properties/', prop_views.properties_list),
    path('api/v1/properties/<int:pk>/', prop_views.property_detail),
    path('api/v1/properties/payment/<int:pk>', prop_views.stripe_create_checkout_session),
    path('api/v1/propIds/', prop_views.propId_list),
    path("api/v1/properties_filter", prop_views.PropertyList.as_view(), name="PropertyList"),
    path("api/v1/properties/user", prop_views.properties_owned_by_user),
    #path('api/v1/users/register/', views.userList.createuser),
    #path('api/v1/users/login/',views.loginView.loginuser),
    path("api/v1/users/logout/",views.logoutuser),
    #path("log_user_activity/", rec_views.log_user_activity),
    #path("user_activity_list/", rec_views.user_activity_list),
    #path('token-auth/', obtain_jwt_token),
    #path('users/', views.UserList.as_view()),
    #path('current_user/', views.current_user),
    path('api/v1/users/register/', views.HarmonyUserList.as_view()),
    path('api/v1/users/login/',obtain_jwt_token),
    path('api/v1/users/authenticate', views.harmonyCurrentUser),
    path('api/v1/users/details', views.harmonyGetUserDetails),
    path('api/v1/cart/add/', cart_views.add_to_cart),
    #path('api/v1/cart/delete/<int:pk>', cart_views.remove),
    path('api/v1/cart/', cart_views.get_cart)
]
