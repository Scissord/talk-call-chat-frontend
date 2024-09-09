import { useRef, useState } from 'react';
import DefaultMode from './chat_footer/default_mode';
import ReloadMode from './chat_footer/reload_mode';
import RecordingMode from './chat_footer/recording_mode';

const ChatFooter = ({
  file,
  setFile,
  message,
  setMessage,
  audio,
  setAudio,
  setRAudio,
  handleSendMessage,
  isMessageSending
}) => {
  const fileInputRef = useRef(null);

  const audioChunksRef = useRef([]);
  const audioContextRef = useRef(null);
  const dataArrayRef = useRef(null);
  const analyserRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const animationRef = useRef(null);

  const [mode, setMode] = useState('default');
  const [volume, setVolume] = useState(0);

  const startRecording = () => {
    setFile(null);
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        audioContextRef.current = audioContext;
        const source = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        analyserRef.current = analyser;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        dataArrayRef.current = dataArray;

        source.connect(analyser);

        const options = { mimeType: 'audio/ogg; codecs=opus' }; // Используем правильный MIME-тип
        const mediaRecorder = new MediaRecorder(stream, options);
        mediaRecorderRef.current = mediaRecorder;
        mediaRecorder.start();

        mediaRecorder.ondataavailable = (event) => {
            audioChunksRef.current.push(event.data);
        };

        mediaRecorder.onstop = async () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/ogg; codecs=opus' });
          const audioUrl = URL.createObjectURL(audioBlob);

          // Создаем объект File вместо Blob
          const audioFile = new File([audioBlob], 'recording.ogg', { type: 'audio/ogg; codecs=opus' });

          setAudio(audioUrl);
          setRAudio(audioFile);

          audioChunksRef.current = [];
          audioContext.close();
          cancelAnimationFrame(animationRef.current);
        };

        setMode('recording');

        animate();
      })
      .catch(error => {
          console.error('Ошибка при записи аудио:', error);
      });
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setMode('reload');
    }
  };

  const handleDeleteRecord = () => {
    setMode('default');
  };

  const handleReloadRecord = () => {
    setAudio(null);
    setRAudio(null);
    startRecording();
    setMode('recording');
  };

  const animate = () => {
    if (analyserRef.current && dataArrayRef.current) {
      analyserRef.current.getByteFrequencyData(dataArrayRef.current);
      const maxVolume = Math.max(...dataArrayRef.current);
      setVolume(maxVolume);
      animationRef.current = requestAnimationFrame(animate);
    }
  };

  const handleFileChange = (e) => {
    setAudio(null);
    setRAudio(null);
    const selectedFile = e.target.files[0];
    setMessage("");
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <div className='flex items-center gap-2 border-t border-slate-300'>
      {mode === 'default' && (
        <DefaultMode
          fileInputRef={fileInputRef}
          handleFileChange={handleFileChange}
          file={file}
          setFile={setFile}
          message={message}
          setMessage={setMessage}
          handleSendMessage={handleSendMessage}
          startRecording={startRecording}
          isMessageSending={isMessageSending}
        />
      )}
      {mode === 'recording' && (
        <RecordingMode
          volume={volume}
          stopRecording={stopRecording}
          handleDeleteRecord={handleDeleteRecord}
        />
      )}
      {mode === 'reload' && (
        <ReloadMode
          handleDeleteRecord={handleDeleteRecord}
          audio={audio}
          handleReloadRecord={handleReloadRecord}
          handleSendMessage={handleSendMessage}
          isMessageSending={isMessageSending}
        />
      )}
    </div>
  )
}

export default ChatFooter