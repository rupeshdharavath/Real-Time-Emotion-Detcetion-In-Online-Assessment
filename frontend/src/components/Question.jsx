import React from 'react';

const Question = ({ 
  question, 
  answers, 
  selectedAnswer, 
  setSelectedAnswer,
  emotion 
}) => {
  return (
    <div className="col-md-8">
      <div className="card shadow-sm border-0 h-100">
        <div className="card-body p-4">
          <h1 className="card-title text-primary mb-4">🧠 Emotion Detection Test</h1>
          <h2 className="h3 mb-4">{question}</h2>
          
          <div className="row g-3 mb-4">
            {answers.map((ans, i) => (
              <div key={i} className="col-md-6">
                <button
                  onClick={() => setSelectedAnswer(ans)}
                  className={`w-100 btn btn-lg ${selectedAnswer === ans 
                    ? 'btn-primary' 
                    : 'btn-outline-primary'}`}
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
  );
};

export default Question;