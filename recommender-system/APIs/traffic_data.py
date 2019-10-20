import requests

URL = "https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json"

frc_lookup = {
'FRC0': 'Motorway, Freeway',
'FRC1': 'Major road',
'FRC2': 'Major road',
'FRC3': 'Secondary road',
'FRC4': 'Connecting local road',
'FRC5': 'Important local road',
'FRC6': 'Local road'}



def getTraffic(lat, long):

    latlong = str(lat) + ',' + str(long)
    PARAMS = {'point': latlong, 'unit': "KMPH", 'key': "fXdzi2wWhBaJ6d2TNM4P1XsiDhi4PS6G"}
    r = requests.get(url=URL, params=PARAMS)

    data = r.json()

    frc = data['flowSegmentData']['frc']
    currentSpeed = data['flowSegmentData']['currentSpeed']
    freeFlowSpeed = data['flowSegmentData']['freeFlowSpeed']
    currentTravelTime = data['flowSegmentData']['currentTravelTime']
    freeFlowTravelTime = data['flowSegmentData']['freeFlowTravelTime']

    return frc_lookup[frc], currentSpeed, freeFlowSpeed, currentTravelTime, freeFlowTravelTime
