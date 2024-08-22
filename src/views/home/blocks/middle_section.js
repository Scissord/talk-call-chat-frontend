import axios from 'axios';
import { useContext, useEffect, useState, useRef } from 'react';
import Conversations from './middle_section/conversations';
import Conversation from './middle_section/conversation';
import ConversationInfo from './middle_section/conversation_info';
import { AuthContext } from 'contexts/auth';
import { ViewContext } from 'contexts/view';

const limit = 20;

const MiddleSection = ({ search, currentPage, setCurrentPage }) => {
  const auth = useContext(AuthContext);
  const context = useContext(ViewContext);

  const [activeConversation, setActiveConversation] = useState({
    customer_id: null,
    customer_good: "",
    customer_phone: "",
    leadvertex_id: null
  });

  const [conversation, setConversation] = useState([]);
  const [type, setType] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [message, setMessage] = useState('');
  const [isMessageSending, setIsMessageSending] = useState(false);

  const [file, setFile] = useState(null);
  const [audio, setAudio] = useState(null);
  const [rAudio, setRAudio] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    fetchConversations();
  }, [search, type, currentPage]);

  const fetchConversations = async () => {
    const params = {
      limit: limit,
      page: currentPage,
      type,
    };

    if(search !== "") {
      params.search = search;
    };

    await axios({
      method: 'GET',
      url: `/conversations`,
      params: {
        ...params
      },
      // withCredentials: true
    })
      .then((res) => {
        if(search !== "") {
          setConversations([...res.data.conversations]);
        } else {
          setConversations(prev => [...prev, ...res.data.conversations]);
        }
      })
      .catch((err) => {
        context.notification.show(err.response.data.detail, "error")
      })
  };

  const fetchConversation = async (conversation_id) => {
    await axios({
      method: 'GET',
      url: `/messages/${conversation_id}`,
    })
      .then((res) => setConversation(res.data.messages))
      .catch((err) => context.notification.show(err.response.data.detail, "error"))
  };

  const handleSendMessage = async (e) => {
    if( !validateSendMessage() ) return;
    setIsMessageSending(true);

    const forms = new FormData();

    forms.append('customer_id', activeConversation.customer_id);
    if(message) {
      forms.append('message', message);
      forms.append('type', "textMessage");
    }

    if(rAudio) {
      forms.append('files', rAudio);
      forms.append('type', "fileMessage");
    };

    if(file) {
      forms.append('files', file);
      forms.append('type', "fileMessage");
    };

    if(location) {
      forms.append('location', location);
      forms.append('type', "locationMessage");
    };

    await axios({
      method: "POST",
      url: `/messages/${activeConversation.id}`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: forms
    })
      .then((res) => {
        const newConversation = [...conversation];
        newConversation.push(res.data.message);
        setConversation(newConversation);
        setMessage('');
        setFile(null);
        setIsMessageSending(false);
      })
      .catch((err) => {
        context.notification.show(err.response.data.detail, "error")
      })
  };

  const validateSendMessage = () => {
    console.log(message.length);
    if(file === null && message.length === 0 && rAudio === null) {
      context.notification.show('Пустое сообщение', "error");
      return false;
    };

    return true;
  };

  return (
    <div className='flex flex-col sm:flex-row h-[88vh]'>
      <Conversations
        setCurrentPage={setCurrentPage}
        fetchConversation={fetchConversation}
        type={type}
        setType={setType}
        conversations={conversations}
        setConversations={setConversations}
        activeConversation={activeConversation}
        setActiveConversation={setActiveConversation}
        setFile={setFile}
      />
      <Conversation
        setConversations={setConversations}
        setCurrentPage={setCurrentPage}
        conversation={conversation}
        setConversation={setConversation}
        fetchConversations={fetchConversations}
        activeConversation={activeConversation}
        setActiveConversation={setActiveConversation}
        message={message}
        setMessage={setMessage}
        file={file}
        setFile={setFile}
        handleSendMessage={handleSendMessage}
        audio={audio}
        setAudio={setAudio}
        rAudio={rAudio}
        setRAudio={setRAudio}
        isMessageSending={isMessageSending}
      />
      <ConversationInfo
        activeConversation={activeConversation}
        message={message}
        setMessage={setMessage}
      />
    </div>
  )
}

export default MiddleSection;
