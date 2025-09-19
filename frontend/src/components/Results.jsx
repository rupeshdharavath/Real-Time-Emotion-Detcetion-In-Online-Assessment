import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
} from 'recharts';
//import EmotionPieChart from './EmotionPieChart';

const Results = ({ answers = [], onRestart = () => {} }) => {
  // Ensure answers is always an array
  const safeAnswers = Array.isArray(answers) ? answers : [];

  // Group and count emotions
  const emotionCounts = safeAnswers.reduce((acc, entry) => {
    const emotion = entry.emotion || 'Unknown';
    acc[emotion] = (acc[emotion] || 0) + 1;
    return acc;
  }, {});

  // Prepare chart data
  const chartData = Object.keys(emotionCounts).map((emotion) => ({
    emotion,
    count: emotionCounts[emotion],
  }));

  return (
    
      <div className="container-fluid bg-light min-vh-100 py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-white text-black">
                <h1 className="h2 text-center my-2">Emotion Summary</h1>
              </div>
              <div className="card-body p-4">
                {safeAnswers.length > 0 ? (
                  <>
                    {safeAnswers.map((entry, idx) => (
                      <div key={idx} className="card mb-3">
                        <div className="card-body">
                          <h3 className="h4 card-title">Q{idx + 1}: {entry.question || 'No question'}</h3>
                          <div className="alert alert-success mb-2">
                            <strong>Answer:</strong> {entry.answer || 'No answer'}
                          </div>
                          <div className="alert alert-warning mb-0">
                            <strong>Emotion:</strong> {entry.emotion || 'Not detected'}
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Emotion Bar Chart */}
                    {chartData.length > 0 && (
                      <div className="my-5">
                        <h4 className="text-center mb-3">Emotion Overview</h4>
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="emotion" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#8884d8" />
                          </BarChart>
                        </ResponsiveContainer>

                        {/* Optional: Emotion Trend with LineChart */}
                        <ResponsiveContainer width="100%" height={300}>
                          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="emotion" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="count" stroke="#82ca9d" />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="alert alert-info">
                    No quiz results available. Please complete the quiz first.
                  </div>
                )}

                <div className="d-grid mt-4">
                  <button
                    onClick={onRestart}
                    className="btn btn-dark btn-lg"
                  >
                    Restart Test
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    
    
  );
};

export default Results;