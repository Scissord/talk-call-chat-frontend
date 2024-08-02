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

  const [activeConversation, setActiveConversation] = useState({ customer_id: null, customer_good: "", customer_phone: "", leadvertex_id: null });
  
  const [conversation, setConversation] = useState([]);
  const [type, setType] = useState(0);
  const [conversations, setConversations] = useState([]);
  const [message, setMessage] = useState('');

  const [file, setFile] = useState(null);
  const [audio, setAudio] = useState(null);
  const [rAudio, setRAudio] = useState(null);

  useEffect(() => {
    fetchConversations();
  }, [search, type, currentPage]);

  const fetchConversations = async () => {
    const params = {
      manager_id: auth.user.id,
      customers_type: type,
      page: currentPage,
      limit: limit,
    }

    if(search !== "") {
      params.search = search;
    }

    await axios({
      method: 'GET',
      url: `v1/get_conversations`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.user.token}`
      },
      params: {
        ...params
      }
    })
      .then((res) => { 
        if(search !== "") {
          setConversations([...res.data.customers]);
        } else {
          setConversations(prev => [...prev, ...res.data.customers]);
        }
      })
      .catch((err) => { 
        context.notification.show(err.response.data.detail, "error")
      })
  };

  const fetchConversation = async (customer_id) => {
    await axios({
      method: 'GET',
      url: `v1/get_chat_history/${customer_id}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.user.token}`
      }
    })
      .then((res) => setConversation(res.data.messages))
      .catch((err) => context.notification.show(err.response.data.detail, "error"))
  };

  const handleSendMessage = async (e) => {
    if( !validate() ) return;
    const lead_id = conversation.reverse().find((c) => c.message_incoming === true && c.lead_id)?.lead_id
    if(!lead_id) return;

    const forms = new FormData();
    
		forms.append('message', message);
    forms.append('sender', auth.user.manager_name);
    forms.append('customer_phone', activeConversation.customer_phone);
    forms.append('lead_id', lead_id);

    if(rAudio) {
      forms.append('files', rAudio);
    }
    
    if(file) {
      forms.append('files', file);
    }

    await axios({
      method: "POST",
      url: `/v1/send_message`,
      headers: {
        "Content-Type": "multipart/form-data",
        'Authorization': `Bearer ${auth.user.token}`
      },
      data: forms
    })
      .then((res) => {
        const newConversation = [...conversation];
        newConversation.push(res.data.message);
        setConversation(newConversation);
        setMessage('');
        setFile(null);
        setAudio(null);
        setRAudio(null);
      })
      .catch((err) => {
        context.notification.show(err.response.data.detail, "error")
      })
  };

  const validate = () => {
    if(file === null && rAudio === null && message.length === 0) {
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
        setAudio={setAudio}
      />
      <Conversation
        conversation={conversation}
        setConversation={setConversation}
        fetchConversations={fetchConversations}
        activeConversation={activeConversation}
        message={message}
        setMessage={setMessage}
        file={file}
        setFile={setFile}
        audio={audio}
        setAudio={setAudio}
        setRAudio={setRAudio}
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
