import cv2
from fer import FER

# Initialize emotion detector
detector = FER()

# Open webcam
cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    if not ret:
        break
    
    # Detect emotions
    emotions = detector.detect_emotions(frame)
    
    for result in emotions:
        (x, y, w, h) = result['box']
        emotion, score = max(result['emotions'].items(), key=lambda item: item[1])
        
        # Draw rectangle around face
        cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
        
        # Display emotion text
        text = f"{emotion}: {score:.2f}"
        cv2.putText(frame, text, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2)
    
    cv2.imshow("Emotion Detection", frame)
    
    # Press 'q' to exit
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
