import React, { useState } from "react";
import MicRecorder from "mic-recorder-to-mp3";

const AudioRecorder = () => {
  const [recorder] = useState(new MicRecorder({ bitRate: 128 }));
  const [isRecording, setIsRecording] = useState(false);
  const [blobURL, setBlobURL] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);

  // Handle microphone permission
  React.useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => {
        setIsBlocked(false);
      })
      .catch(() => {
        setIsBlocked(true);
      });
  }, []);

  const startRecording = () => {
    if (isBlocked) {
      alert(
        "Microphone access is blocked. Please enable it to use the recorder."
      );
    } else {
      recorder
        .start()
        .then(() => {
          setIsRecording(true);
        })
        .catch((e) => console.error(e));
    }
  };

  const stopRecording = () => {
    recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob);
        setBlobURL(blobURL);
        setIsRecording(false);
      })
      .catch((e) => console.error(e));
  };

  return (
    <div>
      <h2>Audio Recorder</h2>
      <div>
        <button onClick={startRecording} disabled={isRecording}>
          Start Recording
        </button>
        <button onClick={stopRecording} disabled={!isRecording}>
          Stop Recording
        </button>
      </div>
      {blobURL && (
        <div>
          <h3>Recorded Audio:</h3>
          <audio src={blobURL} controls />
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
