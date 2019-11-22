from flask import Flask
from flask import  request, jsonify, send_file
from flask_pymongo import  PyMongo
from flask_cors import CORS, cross_origin
import recommenderSystem2 as rs
import requests
import json

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/test"
mongo = PyMongo(app)

#API SPEC################
'''
user_actions:
UID, PROPID, ACTION(int)
'''

def propIDtoInt(propID):
    integer = int(propID[4:])
    return integer

def InttoPropID(Integer):
    intPart = str(Integer)
    intPart = '0'*(5-len(str(Integer)))+intPart
    return 'prop' + intPart

def is_higher_priority_action(curr_action, old_action):
#    action_priority_dict = {"add_to_cart": 3, "click": 2, "hower": 1}
#    curr_priority = action_priority_dict[curr_action]
#    old_priority = action_priority_dict[old_action]
#    return curr_priority > old_priority 
    return curr_action>old_action

def userIDtoInt(user):
    user_map = mongo.db.user_map
    relevant_entry = user_map.find_one({'user': user})
    if relevant_entry == None:
        integer = user_map.count()+1
        user_map.insert({'user': user, 'integer': integer})
    else:
        integer = relevant_entry['integer']
    return integer

def IntToUserID(integer):
    user_map = mongo.db.user_map
    relevant_entry = user_map.find_one({'integer': integer})
    user = relevant_entry['user']
    return user

@app.route("/user_actions", methods=['POST'])
@cross_origin()
def user_actions():
    user_actions = mongo.db.user_actions
#    req = request.get_json()
    user = request.json['user']
    user_int = userIDtoInt(user)
    
    property_id = request.json['property_id']
    property_int = propIDtoInt(property_id)
    action = request.json['action']
    relevant_entry = user_actions.find_one({'user_int': user_int, 'property_int': property_int})
#    print(relevant_entry['action'])
    if relevant_entry == None:
        user_actions_id = user_actions.insert({'user_int': user_int, 'property_int': property_int, 'action': action})
    elif is_higher_priority_action(action, relevant_entry['action']):
        user_actions.delete_one(relevant_entry)
        relevant_entry = user_actions.insert({'user_int': user_int, 'property_int': property_int, 'action': action})
#        relevant_entry.save()
#    new_user_action = user_actions.find_one({'_id': user_actions_id })
    return "Whatever"

@app.route("/user_recommendations/<user>", methods=['GET'])
@cross_origin()
def user_recommendations(user):
    user_actions = mongo.db.user_actions
    tr_data = []
    output = requests.get('http://localhost:8000/api/v1/propIds').text
    output = json.loads(output)
    print(output, type(output))
    output = [propIDtoInt(property_id) for property_id in output]
    user_int = userIDtoInt(user)
    for s in user_actions.find({'user_int':user_int}):
        tr_data.append({'user' : s['user_int'], 'property_id' : s['property_int'], 'action': s['action']})
    df = rs.makeDfFromData(tr_data)
    model = rs.trainModel(df)
    output = rs.outputTopK(model,user,output,7)
    propOutput = [json.loads(requests.get('http://localhost:8000/api/v1/properties/'+str(Int)).text) for Int in sorted(output)]
    print(propOutput)
    output = [InttoPropID(Int) for Int in sorted(output)]
    return jsonify({'result' : propOutput})

@app.route("/recommender/hover_click",methods=['POST'])
@cross_origin()
def returnPropHoverClick():
    properties = request.json
    propIds = [i["propId"] for i in properties]
    propNames = [i["propertyName"] for i in properties]
    final = []
    user_actions = mongo.db.user_actions
    for each,name in zip(propIds,propNames):
        data ={}
        data["propId"] = each
        data["propName"] = name
        property_int = propIDtoInt(each)
        hover_count = user_actions.find({'property_int':property_int,'action':1}).count()
        data["hovers"] = hover_count
        click_count = user_actions.find({'property_int':property_int,'action':2}).count()
        data["clicks"] = click_count
        final.append(data)
    return jsonify(final)
@app.route("/prop_id/total_hovers",methods=['POST'])
@cross_origin()
def returnHoverCount():
    property_id = request.json['property_id']
    property_int = propIDtoInt(property_id)
    user_actions = mongo.db.user_actions
    hover_count = user_actions.find({'property_int':property_int,'action':1}).count()
    return jsonify({"count":hover_count})

@app.route("/prop_id/total_clicks",methods=['POST'])
@cross_origin()
def returnclickCount():
    property_id = request.json['property_id']
    property_int = propIDtoInt(property_id)
    user_actions = mongo.db.user_actions
    click_count = user_actions.find({'property_int':property_int,'action':2}).count()
    return jsonify({"count":click_count})

@app.route("/recommender/get_image/<property_id>",methods=["GET"])
@cross_origin()
def get_image(property_id):
    images = mongo.db.images
    image_url = images.find_one({"_id" : property_id})
    print(image_url["url"])
    return send_file(image_url['url'],mimetype='image/jpg')

#@app.route("/user_recommendations/propList/<users>", methods=['POST'])
#def preference_sort(user):
#    propList = request.json['properties']
#    u

if __name__ == '__main__':
    app.run(debug=True)
