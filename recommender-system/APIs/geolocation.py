from opencage.geocoder import OpenCageGeocode
from pprint import pprint

key = '3b05f59469c1468d96109388aea8385a'
geocoder = OpenCageGeocode(key)


def getLatLong(location):
    results = geocoder.geocode(location)
    return results[0]['geometry']['lat'], results[0]['geometry']['lng']