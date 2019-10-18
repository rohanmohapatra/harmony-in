import requests

URL = "https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json"

latlong = "13.057563,77.471209"
speedunit = "KMPH"
apikey = "fXdzi2wWhBaJ6d2TNM4P1XsiDhi4PS6G"

PARAMS = {'point': latlong, 'unit': speedunit, 'key': apikey}

r = requests.get(url=URL, params=PARAMS)

data = r.json()

frc = data['flowSegmentData']['frc']
currentSpeed = data['flowSegmentData']['currentSpeed']
freeFlowSpeed = data['flowSegmentData']['freeFlowSpeed']
currentTravelTime = data['flowSegmentData']['currentTravelTime']
freeFlowTravelTime = data['flowSegmentData']['freeFlowTravelTime']

print ('FRC: ',frc,'\nCurrent Speed: ', currentSpeed, '\nFree Flow Speed: ', freeFlowSpeed, '\nCurrent Travel Time: ', currentTravelTime, '\nFree Flow Travel Time: ', freeFlowTravelTime)


#TODO
#create dictionary for frc values
#import point values from geolocation api