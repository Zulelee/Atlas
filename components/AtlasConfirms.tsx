"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import WaveSurfer from "wavesurfer.js";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export default function AtlasConfirmsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (uploadedFile: File) => {
    setFile(uploadedFile);
    setAudioUrl(URL.createObjectURL(uploadedFile));
    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", uploadedFile);

    try {
      const response = await fetch(
        "https://hook.eu2.make.com/hqwu4jqmtw7ayxcr3sjc1678aokddms3",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(
        "An error occurred while processing the file. Please try again."
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1221] text-white p-8">
      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-8 text-center uppercase"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Atlas Confirms
      </motion.h1>
      <motion.p
        className="text-lg text-center mb-8 mx-auto text-blue-300 max-w-7xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Atlas Confirms analyzes audio recordings of appointment confirmation
        calls. Upload an MP3 file of a call, and our AI will provide insights on
        appointment status, key reasons, call summary, and emotional analysis.
        This tool helps businesses optimize their appointment confirmation
        process and improve customer interactions.
      </motion.p>
      <p className="text-sm text-center mb-8 text-gray-400 max-w-6xl m-auto">
        Disclaimer: We prioritize your privacy and data security. No audio
        files, analysis results, or any other data from your interactions with
        Atlas Confirms are stored on our servers. All processing is done in
        real-time, and once the analysis is complete, the data is immediately
        discarded.
      </p>
      <FileUploadZone
        onFileUpload={handleFileUpload}
        isUploading={isUploading}
      />

      {error && (
        <motion.p
          className="text-red-500 text-center mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </motion.p>
      )}
      {audioUrl && <AudioPlayer audioUrl={audioUrl} />}
      {results && <ResultsDisplay results={results} />}
    </div>
  );
}

interface FileUploadZoneProps {
  onFileUpload: (file: File) => void;
  isUploading: boolean;
}

function FileUploadZone({ onFileUpload, isUploading }: FileUploadZoneProps) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onFileUpload(e.target.files[0]);
    }
  };

  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className={`border-2 border-dashed border-blue-500 rounded-lg p-8 text-center cursor-pointer transition-all ${
          dragActive ? "bg-blue-500 bg-opacity-10" : ""
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="file-upload"
          className="hidden"
          onChange={handleChange}
          accept="audio/mpeg"
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          {isUploading ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              <p className="ml-2">Processing your file...</p>
            </div>
          ) : (
            <p>Drag and drop an MP3 file here, or click to select a file</p>
          )}
        </label>
      </div>
    </motion.div>
  );
}

interface ResultsDisplayProps {
  results: any;
}

function ResultsDisplay({ results }: ResultsDisplayProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      <motion.div variants={cardVariants}>
        <AppointmentStatus status={results.appointmentStatus} />
      </motion.div>
      <motion.div variants={cardVariants}>
        <KeyReason reason={results.keyReason} />
      </motion.div>
      <motion.div variants={cardVariants}>
        <CallSummary summary={results.callSummary} />
      </motion.div>
      <motion.div variants={cardVariants}>
        <EmotionalAnalysis analysis={results.emotionalAnalysis} />
      </motion.div>
    </motion.div>
  );
}

interface AppointmentStatusProps {
  status: {
    confirmed: boolean;
    confidence: number;
    details: string;
  };
}

// function AppointmentStatus({ status }: AppointmentStatusProps) {
//   return (
//     <motion.div
//       className="bg-gray-800 bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-lg p-6 h-full border border-gray-600 shadow-lg"
//       whileHover={{ scale: 1.02 }}
//       transition={{ type: "spring", stiffness: 300 }}
//     >
//       <h2 className="text-2xl font-bold mb-4">Appointment Status</h2>
//       <div className="flex flex-col items-start justify-between h-full">
//         <div
//           className={`text-3xl font-bold  ${
//             status.confirmed ? "text-green-500" : "text-red-500"
//           }`}
//         >
//           {status.confirmed ? "Confirmed" : "Not Confirmed"}
//         </div>
//         <div className="text-xl ">
//           Confidence: <span className="font-bold">{status.confidence}%</span>
//         </div>
//         <p className="text-gray-300">{status.details}</p>
//       </div>
//     </motion.div>
//   );
// }

function AppointmentStatus({ status }: AppointmentStatusProps) {
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-lg p-6 border border-gray-600 shadow-lg"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <h2 className="text-2xl font-bold mb-4">Appointment Status</h2>
      <div className="flex flex-col items-start gap-2">
        <div
          className={`text-3xl font-bold ${
            status.confirmed ? "text-green-500" : "text-red-500"
          }`}
        >
          {status.confirmed ? "Confirmed" : "Not Confirmed"}
        </div>
        <div className="text-xl">
          Confidence: <span className="font-bold">{status.confidence}%</span>
        </div>
        <p className="text-gray-300">{status.details}</p>
      </div>
    </motion.div>
  );
}

interface KeyReasonProps {
  reason: {
    summary: string;
    excerpt: string;
    timestamp: string;
  };
}

function KeyReason({ reason }: KeyReasonProps) {
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-lg p-6 h-full border border-gray-600 shadow-lg"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <h2 className="text-2xl font-bold mb-4">Key Reason</h2>
      <p className="mb-4">{reason.summary}</p>
      <div className="bg-gray-700 bg-opacity-50 rounded p-4">
        <p className="text-blue-300 mb-2">&quot;{reason.excerpt}&quot;</p>
        {/* <p className="text-sm text-gray-400">Timestamp: {reason.timestamp}</p> */}
      </div>
    </motion.div>
  );
}

interface CallSummaryProps {
  summary: {
    overview: string;
    keyPoints: string[];
  };
}

function CallSummary({ summary }: CallSummaryProps) {
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-lg p-6 h-full border border-gray-600 shadow-lg"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <h2 className="text-2xl font-bold mb-4">Call Summary</h2>
      <p className="mb-4">{summary.overview}</p>
      <h3 className="text-lg font-semibold mb-2">Key Points:</h3>
      <ul className="list-disc list-inside">
        {summary.keyPoints.map((point, index) => (
          <li key={index} className="mb-1">
            {point}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

interface EmotionalAnalysisProps {
  analysis: {
    overallSentiment: string;
    emotions: { name: string; score: number }[];
    emotionIntensity: { agent: number; lead: number };
  };
}

function EmotionalAnalysis({ analysis }: EmotionalAnalysisProps) {
  const emotionData = analysis.emotions.map((emotion) => ({
    name: emotion.name,
    value: emotion.score,
  }));

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-lg p-6 h-full border border-gray-600 shadow-lg"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <h2 className="text-2xl font-bold mb-4">Emotional Analysis</h2>
      <p className="mb-4">
        Overall Sentiment:{" "}
        <span className="font-bold">{analysis.overallSentiment}</span>
      </p>
      <div className="my-4 h-56 p-">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={emotionData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, value }) =>
                `${name}: ${(value * 100).toFixed(0)}%`
              }
            >
              {emotionData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Emotion Intensity:</h3>
        <div className="flex justify-between">
          <span>
            Agent: {(analysis.emotionIntensity.agent * 100).toFixed(0)}%
          </span>
          <span>
            Lead: {(analysis.emotionIntensity.lead * 100).toFixed(0)}%
          </span>
        </div>
        <div className="w-full bg-gray-700 bg-opacity-50 rounded-full h-2.5 mt-2">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${analysis.emotionIntensity.agent * 100}%` }}
          ></div>
        </div>
      </div>
    </motion.div>
  );
}

interface AudioPlayerProps {
  audioUrl: string;
}

function AudioPlayer({ audioUrl }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);

  useEffect(() => {
    if (waveformRef.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#4a9eff",
        progressColor: "#006aff",
        cursorColor: "#006aff",
        barWidth: 2,
        barRadius: 3,
        height: 60,
      });

      wavesurfer.current.load(audioUrl);

      wavesurfer.current.on("ready", () => {
        setDuration(wavesurfer.current!.getDuration());
      });

      wavesurfer.current.on("audioprocess", () => {
        setCurrentTime(wavesurfer.current!.getCurrentTime());
      });

      return () => {
        wavesurfer.current!.destroy();
      };
    }
  }, [audioUrl]);

  const handlePlayPause = () => {
    if (wavesurfer.current) {
      wavesurfer.current.playPause();
      setIsPlaying(!isPlaying);
    }
  };

  const handleSpeedChange = (speed: number) => {
    if (wavesurfer.current) {
      wavesurfer.current.setPlaybackRate(speed);
      setPlaybackRate(speed);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-lg p-6 mb-8 border border-gray-600 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4">Audio Player</h2>
      <div ref={waveformRef} className="mb-4"></div>
      <div className="flex items-center justify-between mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={handlePlayPause}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <div>
          <span className="mr-2">{formatTime(currentTime)}</span>
          <span>/</span>
          <span className="ml-2">{formatTime(duration)}</span>
        </div>
        <div>
          <label htmlFor="speed" className="mr-2">
            Speed:
          </label>
          <select
            id="speed"
            value={playbackRate}
            onChange={(e) =>
              handleSpeedChange(Number.parseFloat(e.target.value))
            }
            className="bg-gray-700 text-white rounded px-2 py-1"
          >
            <option value="0.5">0.5x</option>
            <option value="1">1x</option>
            <option value="1.5">1.5x</option>
            <option value="2">2x</option>
          </select>
        </div>
      </div>
    </motion.div>
  );
}
