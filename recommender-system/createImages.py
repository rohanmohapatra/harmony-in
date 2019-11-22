import json 
def create_images():
    for i in range(31):
        prop = 'prop'+'{0:05}'.format(i+63)
        urll = 'images/Hyderabad_'+ str(i) + ".jpg"
        data = {
            "_id" : prop,
            "url" : urll
        }
        print(json.dumps(data)+",")

create_images()