import { FC, useRef, useState } from 'react';
import DefaultMode from './ChatFooter/DefaultMode';
import ReloadMode from './ChatFooter/ReloadMode';
import RecordingMode from './ChatFooter/RecordingMode';
import { useChats } from '@context';

const ChatFooter: FC = () => {
  const {
    file,
    setFile,
    message,
    setMessage,
    audio,
    setAudio,
    setRAudio,
    handleSendMessage,
    isMessageSending
  } = useChats();
  const fileInputRef = useRef<HTMLInputElement>(null); // Тип для инпута файла

  const audioChunksRef = useRef<Blob[]>([]); // Храним аудио как массив Blob
  const audioContextRef = useRef<AudioContext | null>(null); // Типизация для AudioContext
  const dataArrayRef = useRef<Uint8Array | null>(null); // Типизация для массива аудио данных
  const analyserRef = useRef<AnalyserNode | null>(null); // AnalyserNode для аудио анализа
  const mediaRecorderRef = useRef<MediaRecorder | null>(null); // Типизация для MediaRecorder
  const animationRef = useRef<number | null>(null); // Типизация для анимации (requestAnimationFrame)

  const [mode, setMode] = useState<'default' | 'recording' | 'reload'>('default');
  const [volume, setVolume] = useState<number>(0);

  const startRecording = () => {
    setFile(null);
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const audioContext = new (window.AudioContext)();
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

        mediaRecorder.ondataavailable = (event: BlobEvent) => {
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
          if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
          }
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
    setAudio("");
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAudio("");
    setRAudio(null);
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setMessage('');
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
  );
};

export default ChatFooter;
