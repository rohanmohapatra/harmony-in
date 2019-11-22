import json
import requests
import random

sellers = ['seller1', 'seller2', 'seller3', 'seller4', 'seller5']
folder = ['../../LocationData/Bangalore.json', '../../LocationData/Chennai.json', '../../LocationData/Hyderabad.json']
traff_folder = ["../../blrtraffic.json", "../../chennaitraffic.json", "../../hydtraffic.json"]
poll_folder =["../../blrpollution.json", "../../chennaipollution.json", "../../hydpollution.json"]
propertyType = ["buy","rent"]
rentee = ['rentee1', 'rentee2', 'rentee3', 'rentee4' , 'rentee5']
i=0
with open('/home/rohan/Desktop/Semester7/SoftwareEngineering/harmony-in/locationData.json', 'r') as data_file:
    json_data = data_file.read()

traff_data = json.loads(json_data)
#traff_data = json.loads("/home/rohan/Desktop/Semester7/SoftwareEngineering/harmony-in/locationData.json")


for file in folder:
    file_index = folder.index(file)
    traff_file = traff_folder[file_index]
    with open(traff_file) as data_file:
        json_data = data_file.read()
    traff_data = json.loads(json_data)

    poll_file = poll_folder[file_index]
    with open(poll_file) as data_file:
        json_data = data_file.read()
    poll_data = json.loads(json_data)

    with open(file) as json_file:
        data = json.load(json_file)
        for place in data:
            index = data.index(place)
            traffic = traff_data[index]["currentSpeed"] + traff_data[index]["freeFlowSpeed"]/2
            if(traffic > 40):
                traffic = "low"
            elif( 30 <traffic <= 40):
                traffic = "medium"
            else:
                traffic = "high"

            airQuality = poll_data[index]["airDescription"]
            airQuality = airQuality.split(" ")[0].lower()
            #airQuality = "moderate"
            type_property = random.randint(0,1)
            if(type_property == 1):
                price_to_divide = 1000
                user = rentee[i]
            else:
                price_to_divide = 100000
                user = sellers[i]
            inp = {
                    "propertyName" : place['societyName'],
                    "propertyAddress" : place['title'][1],
                    "price" : place['price']//price_to_divide,
                    "bhk" : place['bhk'],
                    "societyName" : place['societyName'],
                    "user" : user,
                    "city" : place['city'].lower(),
                    "propertyType" : propertyType[type_property],
                    "traffic" : traffic,
                    "airQuality" : airQuality
                    }
            i+=1
            i = i%5
#             print(inp)
            req_data = requests.post('http://127.0.0.1:8000/api/v1/properties/', data=inp)
            print("Request succeeded with status {}".format(req_data.status_code))
        
print("added to properties")