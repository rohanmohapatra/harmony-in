
from login.serializers import HarmonyUserSerializer
from . models import user


def my_jwt_response_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': HarmonyUserSerializer(user, context={'request': request}).data
    }