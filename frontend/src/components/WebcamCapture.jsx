import React from 'react';
import Webcam from 'react-webcam';

const WebcamCapture = ({ webcamRef }) => {
  return (
    <div className="col-md-4 d-flex flex-column align-items-center">
      <div className="card shadow-sm border-0 h-100 w-100">
        <div className="card-body d-flex flex-column">
          <h3 className="card-title text-center mb-3">Emotion Detection</h3>
          <div className="flex-grow-1 d-flex justify-content-center align-items-center">
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="img-fluid rounded border border-3 border-primary"
              style={{ maxHeight: '300px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebcamCapture;