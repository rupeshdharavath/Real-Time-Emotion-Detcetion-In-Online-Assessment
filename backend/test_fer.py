from fer import FER
import cv2

detector = FER()

cap = cv2.VideoCapture(0)  # Open webcam

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Detect emotions in the frame
    emotion, score = detector.top_emotion(frame)

    if emotion:
        text = f"{emotion} ({score:.2f})"
        cv2.putText(frame, text, (30, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

    # Show webcam feed with emotion text
    cv2.imshow('Emotion Detection', frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
