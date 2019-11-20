from flask import Flask
from flask import  request, jsonify
from flask_pymongo import  PyMongo
from flask_cors import CORS, cross_origin
import recommenderSystem2 as rs
import json

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/test"
mongo = PyMongo(app)

#API SPEC################
'''
user_actions:
UID, PROPID, ACTION(int)
'''

def is_higher_priority_action(curr_action, old_action):
#    action_priority_dict = {"add_to_cart": 3, "click": 2, "hower": 1}
#    curr_priority = action_priority_dict[curr_action]
#    old_priority = action_priority_dict[old_action]
#    return curr_priority > old_priority 
    return curr_action>old_action

@app.route("/user_actions", methods=['POST'])
@cross_origin()
def user_actions():
    user_actions = mongo.db.user_actions
#    req = request.get_json()
    user = request.json['user']
    property_id = request.json['property_id']
    action = request.json['action']
    relevant_entry = user_actions.find_one({'user': user, 'property_id': property_id})
#    print(relevant_entry['action'])
    if relevant_entry == None:
        user_actions_id = user_actions.insert({'user': user, 'property_id': property_id, 'action': action})
    elif is_higher_priority_action(action, relevant_entry['action']):
        user_actions.delete_one(relevant_entry)
        relevant_entry = user_actions.insert({'user': user, 'property_id': property_id, 'action': action})
#        relevant_entry.save()
#    new_user_action = user_actions.find_one({'_id': user_actions_id })
    return "Whatever"

@app.route("/user_recommendations/<user>", methods=['POST'])
@cross_origin()
def user_recommendations(user):
    user_actions = mongo.db.user_actions
    tr_data = []
    output = request.json['property_list']
    for s in user_actions.find({'user':user}):
        tr_data.append({'user' : s['user'], 'property_id' : s['property_id'], 'action': s['action']})
    df = rs.makeDfFromData(tr_data)
    model = rs.trainModel(df)
    output = rs.outputTopK(model,user,output,len(output))
    return jsonify({'result' : output})

#@app.route("/user_recommendations/propList/<users>", methods=['POST'])
#def preference_sort(user):
#    propList = request.json['properties']
#    u

if __name__ == '__main__':
    app.run(debug=True)
