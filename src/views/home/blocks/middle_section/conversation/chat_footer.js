import { useContext, useRef, useState } from 'react';
import { ViewContext } from 'contexts/view';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import lamejs from 'lamejs';

const ChatFooter = ({ 
  file, 
  setFile,
  message, 
  setMessage, 
  audio, 
  setAudio, 
  setRAudio,
  handleSendMessage 
}) => {
  const context = useContext(ViewContext);
  const fileInputRef = useRef(null);

  const audioChunksRef = useRef([]);
  const audioContextRef = useRef(null);
  const dataArrayRef = useRef(null);
  const analyserRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const animationRef = useRef(null);

  const [mode, setMode] = useState('default');
  const [volume, setVolume] = useState(0);
  const [isPickedVisible, setIsPickedVisible] = useState(false);

  // const convertToMp3 = async (blob) => {
  //   const reader = new FileReader();
  //   reader.readAsArrayBuffer(blob);
  //   reader.onloadend = async () => {
  //     const arrayBuffer = reader.result;
  //     const buffer = new Int16Array(arrayBuffer);
  
  //     // Убедимся, что длина буфера кратна 2
  //     const bufferSize = Math.floor(buffer.length / 2) * 2;
  //     const buffer2 = buffer.subarray(0, bufferSize);
  
  //     const mp3Encoder = new lamejs.Mp3Encoder(1, 44100, 128); // Создаем кодировщик MP3
  //     const mp3Data = [];
  //     const sampleBlockSize = 1152; // Размер блока выборки
  
  //     for (let i = 0; i < bufferSize; i += sampleBlockSize) {
  //       const sampleChunk = buffer2.subarray(i, i + sampleBlockSize);
  //       const mp3buf = mp3Encoder.encodeBuffer(sampleChunk);
  //       if (mp3buf.length > 0) {
  //         mp3Data.push(new Int8Array(mp3buf));
  //       }
  //     }
  
  //     const mp3Blob = new Blob(mp3Data, { type: 'audio/mp3' }); // Создаем Blob для MP3 данных
  //     const mp3Url = URL.createObjectURL(mp3Blob);
  //     console.log(mp3Blob);
      // Делаем что-то с mp3Url, например, сохраняем или воспроизводим
  
      // Здесь можно вызывать функцию для обработки полученного MP3
  //   };
  // };
  
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
  
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        mediaRecorder.start();
  
        mediaRecorder.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };
  
        mediaRecorder.onstop = async () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/mp3' });
          const audioUrl = URL.createObjectURL(audioBlob);
  
          setAudio(audioUrl);
          setRAudio(audioBlob);
  
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
      setMode('before');
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
        <>
          <div className='w-[5%] flex items-center justify-center pl-3 py-6'>
            <div onClick={() => fileInputRef.current.click()}>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-6 h-6 text-gray-300 cursor-pointer hover:text-gray-400 hover:font-bold"
              >
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
              </svg>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </div>
          <div className='w-[85%] relative flex items-center h-full'>
            {file &&
              <div className="absolute top-0">
                <div className="flex items-center gap-1">
                  <p className={`
                    text-[10px]
                    ${context.colorMode.theme === 0 ? 'text-black' : 'text-white'}
                  `}>
                    {file.name}
                  </p>
                  <svg
                    viewBox="0 0 1024 1024"
                    fill="currentColor"
                    height="0.7em"
                    width="0.7em"
                    cursor="pointer"
                    onClick={() => setFile(null)}
                  >
                    <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z" />
                  </svg>
                </div>
              </div>
            }

            <input 
              type="text" 
              className='w-full outline-none h-10 rounded-md pl-3 border border-slate-300' 
              placeholder="Введите..."
              value={message}
              onChange={(e) => {
                e.preventDefault();
                setMessage(e.target.value)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
              disabled={!!file}
            />
            <div className='absolute right-0 pr-3'>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 text-gray-300 cursor-pointer hover:text-gray-400 hover:font-bold"
                onClick={handleSendMessage}
              >
                <path d="M22 2L11 13" />
                <path d="M22 2L15 22 11 13 2 9l20-7z" />
              </svg>
            </div>
          </div>
          <div className='w-[10%] flex items-center gap-2 py-6'>
            <div onClick={() => startRecording()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 text-gray-300 cursor-pointer hover:text-gray-400 hover:font-bold"
              >
                <path d="M12 1a3 3 0 0 1 3 3v10a3 3 0 0 1-6 0V4a3 3 0 0 1 3-3z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                <line x1="12" y1="19" x2="12" y2="23"/>
                <line x1="8" y1="23" x2="16" y2="23"/>
              </svg>
            </div>
            <div onClick={() => setIsPickedVisible(!isPickedVisible)} >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-6 h-6 text-gray-300 cursor-pointer hover:text-gray-400 hover:font-bold"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
              </svg>
            </div>
          </div>
          {isPickedVisible && (
            <div className='absolute bottom-0 sm:bottom-20 sm:right-20'>
              <Picker 
                data={data} 
                previewPosition="none" 
                onEmojiSelect={(e) => {
                  setMessage(message + e.native);
                  setIsPickedVisible(!isPickedVisible);
                }}
              />
            </div>
          )}
        </>
      )}
      {mode === 'recording' && (
        <div className='flex items-center justify-center gap-3 w-full'>
          <div className='w-[5%] flex items-center justify-center pl-3 py-6'>
            <div onClick={() => handleDeleteRecord()}>
              <svg
                fill="red"
                viewBox="0 0 16 16"
                height="1.2em"
                width="1.2em"
                cursor={"pointer"}
                className='hover:bg-slate-300 hover:rounded-xl'
              >
                <path d="M6.5 1h3a.5.5 0 01.5.5v1H6v-1a.5.5 0 01.5-.5zM11 2.5v-1A1.5 1.5 0 009.5 0h-3A1.5 1.5 0 005 1.5v1H2.506a.58.58 0 00-.01 0H1.5a.5.5 0 000 1h.538l.853 10.66A2 2 0 004.885 16h6.23a2 2 0 001.994-1.84l.853-10.66h.538a.5.5 0 000-1h-.995a.59.59 0 00-.01 0H11zm1.958 1l-.846 10.58a1 1 0 01-.997.92h-6.23a1 1 0 01-.997-.92L3.042 3.5h9.916zm-7.487 1a.5.5 0 01.528.47l.5 8.5a.5.5 0 01-.998.06L5 5.03a.5.5 0 01.47-.53zm5.058 0a.5.5 0 01.47.53l-.5 8.5a.5.5 0 11-.998-.06l.5-8.5a.5.5 0 01.528-.47zM8 4.5a.5.5 0 01.5.5v8.5a.5.5 0 01-1 0V5a.5.5 0 01.5-.5z" />
              </svg>
            </div>
          </div>
          <div className='w-[85%] relative flex items-center h-full'>
            <div style={{
              width: '100%',
              height: '10px',
              background: 'gray',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                width: `${volume}%`,
                height: '100%',
                background: 'red',
                position: 'absolute',
                left: 0,
                transition: 'width 0.1s'
              }} />
            </div>
          </div>
          <div className='w-[10%] flex items-center gap-2 py-6'>
            <div onClick={() => stopRecording()}>
              <svg
                viewBox="0 0 1024 1024"
                fill={context.colorMode.theme === 0 ? "black" : "white"}
                height="1.4em"
                width="1.4em"
                cursor={"pointer"}
                className='hover:bg-gray-300 hover:rounded-xl'
              >
                <path d="M304 176h80v672h-80zm408 0h-64c-4.4 0-8 3.6-8 8v656c0 4.4 3.6 8 8 8h64c4.4 0 8-3.6 8-8V184c0-4.4-3.6-8-8-8z" />
              </svg>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke={context.colorMode.theme === 0 ? "black" : "white"}
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className='w-5 h-5 cursor-pointer hover:bg-gray-300 hover:rounded-md'
              onClick={handleSendMessage}
            >
              <path d="M22 2L11 13" />
              <path d="M22 2L15 22 11 13 2 9l20-7z" />
            </svg>
          </div>
        </div>
      )}
      {mode === 'before' && (
        <div className='flex items-center justify-center gap-3 w-full h-full'>
          <div className='w-[5%] flex items-center justify-center pl-3 py-6'>
            <div onClick={() => handleDeleteRecord()}>
              <svg
                fill="red"
                viewBox="0 0 16 16"
                height="1.2em"
                width="1.2em"
                cursor={"pointer"}
                className='hover:bg-slate-300 hover:rounded-xl'
              >
                <path d="M6.5 1h3a.5.5 0 01.5.5v1H6v-1a.5.5 0 01.5-.5zM11 2.5v-1A1.5 1.5 0 009.5 0h-3A1.5 1.5 0 005 1.5v1H2.506a.58.58 0 00-.01 0H1.5a.5.5 0 000 1h.538l.853 10.66A2 2 0 004.885 16h6.23a2 2 0 001.994-1.84l.853-10.66h.538a.5.5 0 000-1h-.995a.59.59 0 00-.01 0H11zm1.958 1l-.846 10.58a1 1 0 01-.997.92h-6.23a1 1 0 01-.997-.92L3.042 3.5h9.916zm-7.487 1a.5.5 0 01.528.47l.5 8.5a.5.5 0 01-.998.06L5 5.03a.5.5 0 01.47-.53zm5.058 0a.5.5 0 01.47.53l-.5 8.5a.5.5 0 11-.998-.06l.5-8.5a.5.5 0 01.528-.47zM8 4.5a.5.5 0 01.5.5v8.5a.5.5 0 01-1 0V5a.5.5 0 01.5-.5z" />
              </svg>
            </div>
          </div>
          <div className='w-[85%] flex items-center h-full'>
            {audio && <audio controls src={audio} className='w-full'/>}
          </div>
          <div className='w-[10%] flex items-center gap-2 py-6'>
            <div onClick={() => handleReloadRecord()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke={context.colorMode.theme === 0 ? "black" : "white"}
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 text-gray-300 cursor-pointer hover:bg-gray-300 hover:rounded-lg hover:font-bold"
              >
                <path d="M12 1a3 3 0 0 1 3 3v10a3 3 0 0 1-6 0V4a3 3 0 0 1 3-3z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                <line x1="12" y1="19" x2="12" y2="23"/>
                <line x1="8" y1="23" x2="16" y2="23"/>
              </svg>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke={context.colorMode.theme === 0 ? "black" : "white"}
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className='w-5 h-5 cursor-pointer hover:bg-gray-300 hover:rounded-md'
              onClick={handleSendMessage}
            >
              <path d="M22 2L11 13" />
              <path d="M22 2L15 22 11 13 2 9l20-7z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatFooter