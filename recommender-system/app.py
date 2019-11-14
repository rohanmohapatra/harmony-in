from flask import Flask
from flask import  request, jsonify
from flask_pymongo import  PyMongo
import recommenderSystem2 as rs
import json

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/test"
mongo = PyMongo(app)

@app.route("/user_actions", methods=['POST'])
def user_actions():
    user_actions = mongo.db.user_actions
    user = request.json['user']
    property_id = request.json['property_id']
    action = request.json['action']
    user_actions_id = user_actions.insert({'user': user, 'property_id': property_id, 'action': action})
    new_user_action = user_actions.find_one({'_id': user_actions_id })
    return "Whatever"

@app.route("/user_recommendations/<user>", methods=['GET'])
def user_recommendations(user):
    user_actions = mongo.db.user_actions
    output = []
    for s in user_actions.find():
        output.append({'user' : s['user'], 'property_id' : s['property_id'], 'action': s['action']})
    df = rs.makeDfFromData(output)
    model = rs.trainModel(df)
    output = rs.outputTopK(model,user,output,len(output))
    return jsonify({'result' : output})

#@app.route("/user_recommendations/propList/<users>", methods=['POST'])
#def preference_sort(user):
#    propList = request.json['properties']
#    u

if __name__ == '__main__':
    app.run()
