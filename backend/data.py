from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from bson.json_util import dumps
from bson.objectid import ObjectId
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config["MONGO_URI"] = "mongodb+srv://satwikroopa:Roopa70263@fruitdb.8sxipgz.mongodb.net/test?retryWrites=true&w=majority"
mongo = PyMongo(app)

@app.route('/test', methods=['GET'])
def test():
    doctors = mongo.db.doctors.find({})  # Only include the 'name' field
    return dumps(doctors)

@app.route('/users', methods=['GET'])
def get_users():
    doctors = mongo.db.doctors.find({}, {"name": 1, "address": 1, "phoneNumber":1}).sort('name', 1)  # Only include the 'name' field
    return dumps(doctors)

if __name__ == "__main__":
    app.run(debug=True, port=8088)