import cv2
from fer import FER

# Load FER detector with MTCNN
detector = FER(mtcnn=True)

def get_emotion_from_image(img):
    """
    Detects the top emotion from a given image.
    
    Parameters:
    img (numpy.ndarray): Input image from webcam (BGR format)
    
    Returns:
    str: Top detected emotion or error message
    """
    try:
        # Convert BGR to RGB for FER
        rgb_img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

        # Detect emotions in the image
        faces = detector.detect_emotions(rgb_img)

        if faces:
            top_emotion, score = detector.top_emotion(rgb_img)
            return top_emotion
        else:
            return "No face detected"
    except Exception as e:
        return f"Error: {str(e)}"