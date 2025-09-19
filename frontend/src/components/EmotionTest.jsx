import React from 'react';
import Webcam from 'react-webcam';

const EmotionTest = ({
  question = { question: '', answers: [] }, // Default value
  selectedAnswer = '',
  onAnswerSelect = () => {},
  emotion = '',
  webcamRef = null,
  onNext = () => {}
}) => {
  return (
    <div className="container my-5">
      <div className="row g-4">
        <div className="col-md-8">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body p-4">
              <h1 className="card-title text-primary mb-4">Emotion Detection Test</h1>
              <h2 className="h3 mb-4">{question.question}</h2>
              
              <div className="row g-3 mb-4">
                {question.answers.map((ans, i) => (
                  <div key={i} className="col-md-6">
                    <button
                      onClick={() => onAnswerSelect(ans)}
                      className={`w-100 btn btn-lg btn-light  ${selectedAnswer === ans 
                        ? 'btn-dark' 
                        : 'btn-outline-dark'}`}
                    >
                      {ans}
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="alert alert-info">
                <h3 className="h5">Detected Emotion:</h3>
                <p className="display-6 text-center">{emotion || 'Detecting...'}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-4 d-flex flex-column align-items-center">
          <div className="card shadow-sm border-0 h-100 w-100">
            <div className="card-body d-flex flex-column">
              <h3 className="card-title text-center mb-3">Emotion Detection</h3>
              <div className="flex-grow-1 d-flex justify-content-center align-items-center">
                <Webcam
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className="img-fluid rounded border border-3 border-dark"
                  style={{ maxHeight: '300px' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row mt-4">
        <div className="col-12 d-flex justify-content-center">
          <button
            onClick={onNext}
            disabled={!selectedAnswer}
            className="btn btn-dark btn-lg px-5"
          >
            Next Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmotionTest;