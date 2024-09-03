import axios from 'axios';
import { useContext, useEffect, useState, useRef } from 'react';
import { AuthContext } from 'contexts/auth';
import { ViewContext } from 'contexts/view';
import Conversations from './middle_section/conversations';
import Conversation from './middle_section/conversation';
import ConversationInfo from './middle_section/conversation_info';

const limit = 20;

const MiddleSection = ({ search, currentPage, setCurrentPage }) => {
  const auth = useContext(AuthContext);
  const context = useContext(ViewContext);

  const [activeCustomer, setActiveCustomer] = useState({
    id: null,
    customer_good: "",
    customer_phone: "",
    leadvertex_id: null
  });

  const [conversation, setConversation] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [type, setType] = useState(0);
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
      url: `/customers`,
      params: {
        ...params
      },
    }).then((res) => {
        if(search !== "") {
          setConversations([...res.data.customers]);
        } else if (search === "" && currentPage === 1) {
          setConversations([...res.data.customers]);
        } else {
          setConversations(prev => [...prev, ...res.data.customers]);
        };
      })
      .catch((err) => {
        context.notification.show(err.response.data.detail, "error")
      })
  };

  const fetchConversation = async (customer_id) => {
    await axios({
      method: 'GET',
      url: `/messages/${customer_id}`,
    })
      .then((res) => {
        setConversation(res.data.messages)
        setIsFavorite(res.data.isFavorite)
      })
      .catch((err) => context.notification.show(err.response.data.detail, "error"))
  };

  const handleSendMessage = async (e) => {
    if( !validateSendMessage() ) return;
    setIsMessageSending(true);

    const forms = new FormData();

    forms.append('customer_id', activeCustomer.id);
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
      url: `/messages`,
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
        activeCustomer={activeCustomer}
        setActiveCustomer={setActiveCustomer}
        setFile={setFile}
      />
      <Conversation
        isFavorite={isFavorite}
        setConversations={setConversations}
        setCurrentPage={setCurrentPage}
        conversation={conversation}
        setConversation={setConversation}
        fetchConversations={fetchConversations}
        activeCustomer={activeCustomer}
        setActiveCustomer={setActiveCustomer}
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
        activeCustomer={activeCustomer}
        setMessage={setMessage}
        setFile={setFile}
      />
    </div>
  )
}

export default MiddleSection;
