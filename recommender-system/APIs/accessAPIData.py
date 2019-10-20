import json
import requests

from geolocation import getLatLong
from traffic_data import getTraffic
from air_quality import getAirQuality


propertyList = []

with open('../../properties.json') as json_file:
    data = json.load(json_file)

    
    for row in data:
        location = row['societyName']
        location = location+', Bangalore, India'

        #TODO - Need to get complete address
            # location = 'Arya Hamsa Grande, Royal County, 1st Phase, Gottigere, Bengaluru, Karnataka 560083'

        # print(location)

        # Latitude and Longitude
        latitude, longitude = getLatLong(location)
        
        # Traffic details
        frc, currentSpeed, freeFlowSpeed, currentTravelTime, freeFlowTravelTime = getTraffic(latitude, longitude) 

        # Air quality details
        airDescription, airQualityIndex, airPollutant = getAirQuality(latitude, longitude)

        propertyValues = {
            'location': location,
            'latitude': latitude,
            'longitude': longitude,
            'frc': frc,
            'currentSpeed': currentSpeed,
            'freeFlowSpeed': freeFlowSpeed,
            'currentTravelTime': currentTravelTime,
            'freeFlowTravelTime': freeFlowTravelTime,
            'airDescription': airDescription,
            'airQualityIndex': airQualityIndex,
            'airPollutant': airPollutant
        }
        print('Calculating')
        propertyList.append(propertyValues)
    


print(propertyList)

with open('../../locationData.json', 'w') as outfile:
    json.dump(propertyList, outfile)        
