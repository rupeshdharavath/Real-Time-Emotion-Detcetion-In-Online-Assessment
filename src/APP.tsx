import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import { Camera, Loader2, RefreshCw, Video, VideoOff } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface EmotionData {
  timestamp: number;
  neutral: number;
  happy: number;
  sad: number;
  angry: number;
  fearful: number;
  disgusted: number;
  surprised: number;
}

interface VideoConstraints {
  width: { ideal: number };
  height: { ideal: number };
  facingMode: string;
  frameRate: { ideal: number };
}

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [emotionData, setEmotionData] = useState<EmotionData[]>([]);
  const [currentEmotions, setCurrentEmotions] = useState<Record<string, number>>({});
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [availableCameras, setAvailableCameras] = useState<MediaDeviceInfo[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<string>('');

  const videoConstraints: VideoConstraints = {
    width: { ideal: 1920 },
    height: { ideal: 1080 },
    facingMode: 'user',
    frameRate: { ideal: 30 }
  };

  const loadCameras = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      setAvailableCameras(videoDevices);
      if (videoDevices.length > 0 && !selectedCamera) {
        setSelectedCamera(videoDevices[0].deviceId);
      }
    } catch (error) {
      console.error('Error loading cameras:', error);
    }
  };

  const startVideo = async () => {
    try {
      if (videoRef.current) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            ...videoConstraints,
            deviceId: selectedCamera ? { exact: selectedCamera } : undefined
          }
        });
        videoRef.current.srcObject = stream;
        setIsCameraOn(true);
      }
    } catch (error) {
      console.error('Error starting video:', error);
      setIsCameraOn(false);
    }
  };

  const stopVideo = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraOn(false);
    }
  };

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models';
      
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
        await loadCameras();
        setIsModelLoading(false);
      } catch (error) {
        console.error('Error loading models:', error);
      }
    };

    loadModels();

    return () => {
      stopVideo();
    };
  }, []);

  useEffect(() => {
    if (selectedCamera && !isModelLoading) {
      startVideo();
    }
  }, [selectedCamera, isModelLoading]);

  const handleVideoPlay = () => {
    const interval = setInterval(async () => {
      if (canvasRef.current && videoRef.current) {
        const detections = await faceapi
          .detectSingleFace(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions({
              inputSize: 512,
              scoreThreshold: 0.5
            })
          )
          .withFaceExpressions();

        if (detections) {
          const { expressions } = detections;
          const newEmotionData: EmotionData = {
            timestamp: Date.now(),
            neutral: expressions.neutral,
            happy: expressions.happy,
            sad: expressions.sad,
            angry: expressions.angry,
            fearful: expressions.fearful,
            disgusted: expressions.disgusted,
            surprised: expressions.surprised,
          };

          setCurrentEmotions(expressions);
          setEmotionData(prev => [...prev.slice(-30), newEmotionData]);

          // Draw canvas
          const dims = faceapi.matchDimensions(canvasRef.current, videoRef.current, true);
          const resizedDetections = faceapi.resizeResults(detections, dims);
          canvasRef.current.getContext('2d')?.clearRect(0, 0, dims.width, dims.height);
          faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
        }
      }
    }, 100);

    return () => clearInterval(interval);
  };

  if (isModelLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading emotion detection models...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Camera className="w-8 h-8" />
              Real-time Emotion Detection
            </h1>
            <div className="flex items-center gap-4">
              <select
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedCamera}
                onChange={(e) => setSelectedCamera(e.target.value)}
              >
                {availableCameras.map((camera) => (
                  <option key={camera.deviceId} value={camera.deviceId}>
                    {camera.label || `Camera ${camera.deviceId.slice(0, 5)}...`}
                  </option>
                ))}
              </select>
              <button
                onClick={() => isCameraOn ? stopVideo() : startVideo()}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                {isCameraOn ? (
                  <>
                    <VideoOff className="w-5 h-5" />
                    Stop Camera
                  </>
                ) : (
                  <>
                    <Video className="w-5 h-5" />
                    Start Camera
                  </>
                )}
              </button>
              <button
                onClick={loadCameras}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                title="Refresh camera list"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="relative bg-black rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                onPlay={handleVideoPlay}
                className="rounded-lg w-full"
              />
              <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full"
              />
              {!isCameraOn && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 text-white">
                  <p className="text-xl font-semibold">Camera is off</p>
                </div>
              )}
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Current Emotions</h2>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(currentEmotions).map(([emotion, value]) => (
                  <div key={emotion} className="bg-white rounded-lg p-4 shadow">
                    <div className="text-sm text-gray-600 capitalize">{emotion}</div>
                    <div className="text-2xl font-bold">{(value * 100).toFixed(1)}%</div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${value * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Emotion Trends</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={emotionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="timestamp"
                  tickFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()}
                />
                <YAxis />
                <Tooltip
                  labelFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()}
                  formatter={(value: number) => [(value * 100).toFixed(1) + '%']}
                />
                <Legend />
                <Line type="monotone" dataKey="neutral" stroke="#64748b" />
                <Line type="monotone" dataKey="happy" stroke="#22c55e" />
                <Line type="monotone" dataKey="sad" stroke="#3b82f6" />
                <Line type="monotone" dataKey="angry" stroke="#ef4444" />
                <Line type="monotone" dataKey="fearful" stroke="#8b5cf6" />
                <Line type="monotone" dataKey="disgusted" stroke="#f97316" />
                <Line type="monotone" dataKey="surprised" stroke="#06b6d4" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;