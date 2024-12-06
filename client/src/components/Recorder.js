import MicRecorder from "mic-recorder-to-mp3"; // Correct import
import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AudioTimer from "./AudioTimer";
import axios from "axios";
import "./RecorderStyles.css";

const PORT = 3006;
const ASSEMBLY_API_KEY = "73498a696de145e59ae5f0c344b3111d";

// Set AssemblyAI Axios Header
const assembly = axios.create({
  baseURL: "https://api.assemblyai.com/v2",
  headers: {
    authorization: ASSEMBLY_API_KEY,
    "content-type": "application/json",
  },
});

const App = () => {
  const navigate = useNavigate();
  const recorder = useRef(null); // Recorder instance reference
  const audioPlayer = useRef(null); // Ref for the HTML Audio element
  const [elapsedTime, setElapsedTime] = useState(0);
  const [blobURL, setBlobUrl] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [uploadURL, setUploadURL] = useState("");
  const [transcriptID, setTranscriptID] = useState("");
  const [transcriptData, setTranscriptData] = useState(null);
  const [transcript, setTranscript] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [microphonePermissionGranted, setMicrophonePermissionGranted] =
    useState(false);

  // Effect to initialize MicRecorder and check microphone permission
  useEffect(() => {
    recorder.current = new MicRecorder({ bitRate: 128 });
    checkMicrophonePermission();
  }, []);

  // Function to request microphone access permission
  const checkMicrophonePermission = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicrophonePermissionGranted(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  }, []);

  // Function to start recording
  const startRecording = useCallback(() => {
    if (microphonePermissionGranted) {
      setElapsedTime(0);
      setTranscript(null);
      setTranscriptData(null);
      setTranscriptID(null);
      recorder.current.start().then(() => {
        setIsRecording(true);
      });
    } else {
      console.error("Microphone access permission not granted");
    }
  }, [microphonePermissionGranted]);

  // Function to stop recording and handle audio file
  const stopRecording = useCallback(() => {
    recorder.current
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const file = new File(buffer, "audio.mp3", {
          type: blob.type,
          lastModified: Date.now(),
        });
        const newBlobUrl = URL.createObjectURL(blob);
        setBlobUrl(newBlobUrl);
        setIsRecording(false);
        setAudioFile(file);
      })
      .catch((e) => console.error("Error stopping recording:", e));
  }, []);

  // Effect to upload audio file when `audioFile` changes
  useEffect(() => {
    if (audioFile) {
      assembly
        .post("/upload", audioFile)
        .then((res) => {
          setUploadURL(res.data.upload_url);
          console.log("File uploaded successfully:", res.data.upload_url);
        })
        .catch((err) => console.error("Error uploading file:", err));
    }
  }, [audioFile]);

  // Callback memoized function to predict based on transcript completion
  const predictHandler = useCallback(async () => {
    if (transcriptData && transcriptData.status === "completed" && transcript) {
      setTranscript(transcriptData.text);
      const requestData = {
        data: JSON.stringify(transcript),
      };
      try {
        const response = await axios.post(
          `http://localhost:${PORT}/predict`,
          requestData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const result = response.data;
        if (result) {
          console.log(result);
          navigate("/result", { state: { result: result } });
        }
      } catch (error) {
        console.error("Error predicting:", error);
      }
    } else if (!transcript) {
      window.alert(
        "Input is empty. Please try recording again before submitting"
      );
      setIsLoading(false);
      setAudioFile(null);
    }
  }, [
    transcript,
    transcriptData,
    navigate,
    setIsLoading,
    setAudioFile,
    setTranscript,
    PORT,
  ]);

  // Callback memoized function to check transcript status
  const checkStatusHandler = useCallback(async () => {
    if (!transcriptID) return;
    setIsLoading(true);
    try {
      console.log("Checking status for transcript ID:", transcriptID);
      const response = await assembly.get(`/transcript/${transcriptID}`);
      const data = response.data;
      setTranscriptData(data);
      console.log("Transcription status:", data.status);

      if (data.status === "completed") {
        setTranscript(data.text); // Set completed transcription text
        setIsLoading(false);
      } else if (data.status === "failed") {
        console.error("Transcription failed:", data.error);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error checking transcription status:", error);
      setIsLoading(false);
    }
  }, [transcriptID]);

  // Effect to periodically check transcript status
  useEffect(() => {
    const interval = setInterval(() => {
      if (
        transcriptData &&
        transcriptData.status !== "completed" &&
        isLoading
      ) {
        checkStatusHandler();
      } else {
        setIsLoading(false);
        setTranscript(transcriptData?.text || "");
        clearInterval(interval);
      }
    }, 5000); // Check every 5 seconds
    return () => clearInterval(interval); // Cleanup interval
  }, [transcriptID, transcriptData, isLoading, checkStatusHandler]);

  // Function to submit transcription for processing
  const submitTranscriptionHandler = useCallback(() => {
    if (uploadURL) {
      console.log("Submitting transcription...");
      assembly
        .post("/transcript", { audio_url: uploadURL })
        .then((res) => {
          setTranscriptID(res.data.id); // Set transcript ID
          console.log("Transcription submitted, ID:", res.data.id);
          checkStatusHandler(); // Proceed to check transcript status
        })
        .catch((err) => console.error("Error submitting transcription:", err));
    } else {
      console.error("Upload URL is not available");
    }
  }, [uploadURL, checkStatusHandler]);

  // JSX rendering
  return (
    <div className="recorder-container">
      <h2 className="title">Audio Recorder</h2>
      <AudioTimer
        isRunning={isRecording}
        elapsedTime={elapsedTime}
        setElapsedTime={setElapsedTime}
      />

      {/* Add an audio player to play the recorded audio */}
      {audioFile && !transcript && (
        <audio
          ref={audioPlayer}
          src={blobURL}
          controls="controls"
          className="audio-element"
        />
      )}

      {!isRecording ? (
        <div className="button-container">
          <button onClick={startRecording} className="start-button">
            START
          </button>
        </div>
      ) : (
        <div className="button-container">
          <button onClick={stopRecording} className="start-button">
            STOP
          </button>
        </div>
      )}
      {isLoading ? (
        <div className="button-container">
          <button className="start-button">Processing...</button>
        </div>
      ) : (
        <div className="button-container">
          <button onClick={submitTranscriptionHandler} className="start-button">
            SUBMIT
          </button>
        </div>
      )}
      {transcriptData?.status === "completed" && <p>{transcript}</p>}
    </div>
  );
};

export default App;
