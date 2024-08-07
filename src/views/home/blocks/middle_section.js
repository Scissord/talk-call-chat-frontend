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

  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchConversations();
  }, [search, type, currentPage]);

  const fetchConversations = async () => {
    const params = {
      limit: limit,
      page: currentPage,
      type,
    }

    if(search !== "") {
      params.search = search;
    }

    await axios({
      method: 'GET',
      url: `/conversations`,
      params: {
        ...params
      }
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
    // const lead_id = conversation.reverse().find((c) => c.message_incoming === true && c.lead_id)?.lead_id
    // if(!lead_id) return;

    const forms = new FormData();

    console.log(activeConversation);

		forms.append('message', message);
    // forms.append('sender', auth.user.manager_name);
    // forms.append('customer_phone', activeConversation.customer_phone);
    // forms.append('lead_id', lead_id);

    if(file) {
      forms.append('files', file);
    };

    await axios({
      method: "POST",
      url: `message/${activeConversation.id}`,
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
      })
      .catch((err) => {
        context.notification.show(err.response.data.detail, "error")
      })
  };

  const validateSendMessage = () => {
    if(file === null && message.length === 0) {
      context.notification.show('Пустое сообщение', "error")
      return false
    }

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
