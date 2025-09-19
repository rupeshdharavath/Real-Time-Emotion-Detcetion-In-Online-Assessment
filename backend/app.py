from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import numpy as np
import cv2
from detect_emotion import get_emotion_from_image
from pymongo import MongoClient
import bcrypt

app = Flask(__name__)
CORS(app)

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["emotionApp"]
users_collection = db["users"]

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if users_collection.find_one({"username": username}):
        return jsonify({"success": False, "message": "Username already exists"}), 400

    hashed_pw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    users_collection.insert_one({
        "username": username,
        "password": hashed_pw
    })

    return jsonify({"success": True, "message": "User registered successfully"})

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    user = users_collection.find_one({"username": username})
    if user and bcrypt.checkpw(password.encode('utf-8'), user['password']):
        return jsonify({"success": True})
    else:
        return jsonify({"success": False, "message": "Invalid credentials"}), 401

@app.route('/detect', methods=['POST'])
def detect_emotion():
    try:
        data = request.get_json()
        img_data = data['image'].split(',')[1]
        img_bytes = base64.b64decode(img_data)
        nparr = np.frombuffer(img_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        emotion = get_emotion_from_image(img)
        return jsonify({'emotion': emotion})
    except Exception as e:
        print("Error:", e)
        return jsonify({'emotion': 'Error detecting emotion'}), 500

if __name__ == '__main__':
    app.run(debug=True)