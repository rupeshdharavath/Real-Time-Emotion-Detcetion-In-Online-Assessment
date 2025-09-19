from pymongo import MongoClient
from datetime import datetime

# MongoDB Connection
client = MongoClient("mongodb://localhost:27017/")
db = client["emotion_db"]
collection = db["detections"]

def store_emotion(emotion, confidence):
    data = {
        "timestamp": datetime.now(),
        "emotion": emotion,
        "confidence": confidence
    }
    collection.insert_one(data)
    print("Emotion data saved:", data)

# Example: Call this function when an emotion is detected
detected_emotion = "happy"  # Replace with actual detected emotion
confidence_score = 95.4  # Replace with actual confidence score
store_emotion(detected_emotion, confidence_score)
