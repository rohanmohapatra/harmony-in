import json
import requests

sellers = ['seller1', 'seller2', 'seller3', 'seller4', 'seller5']
folder = ['../../LocationData/Bangalore.json', '../../LocationData/Chennai.json', '../../LocationData/Hyderabad.json']

i=0

for file in folder:
    with open(file) as json_file:
        data = json.load(json_file)
        for place in data:
            inp = {
                    "propertyName" : place['societyName'],
                    "propertyAddress" : place['title'][1],
                    "price" : place['price'],
                    "bhk" : place['bhk'],
                    "societyName" : place['societyName'],
                    "user" : sellers[i],
                    "city" : place['city'],
                    "propertyType" : "buy"
                    }
            i+=1
            i = i%5
#             print(inp)
            data = requests.post('http://127.0.0.1:8000/api/v1/properties/', data=inp)
            print(data.status_code)
        
print("added to properties")