import axios from 'axios';
import { AuthContext } from 'contexts/auth';
import { ViewContext } from 'contexts/view';
import { useState, useEffect, useContext } from 'react'

const AddModal = ({ setConversations }) => {
  const auth = useContext(AuthContext);
  const context = useContext(ViewContext);

  const [message, setMessage] = useState("");
  const [leadvertex_id, setLeadVertexId] = useState(null);

  const handleSendUser = async () => {
    if(!message || !leadvertex_id) {
      context.notification.show("Заполните все поля", "error");
      return;
    };

    await axios({
      method: 'POST',
      url: `v1/send_first_message`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.user.token}`
      },
      data: {
        message: message,
        leadvertex_id: leadvertex_id,
        sender: auth.user.manager_name
      }
    })
      .then((res) => {
        setConversations((prev) => {
          return [res.data.new_customer, ...prev]
        })
        context.modal.hide();
        context.notification.show("Успешно!", "success");
      })
      .catch((err) => context.notification.show(err.response.data.detail, "error"))
  }
 
  return (
    <div className='flex flex-col gap-6 h-[25vh]'>
      <div className='flex items-center gap-3'>
        <p className='w-32 font-semibold text-lg'>LeadVertext_Id:</p>
        <input
          type="text"
          value={leadvertex_id}
          onChange={(e) => setLeadVertexId(e.target.value)}
          placeholder="Введите..."
          className={`pl-[16px] outline-none h-8 w-full 
            bg-transparent text-body-color bg-no-repeat 
            bg-[length:16px] bg-[25px_48%] font-body-font 
            font-semibold text-[15px] placeholder-input-chat-color
            border border-slate-300 rounded-lg
            ${context.colorMode.theme === 0 ? 'text-black' : 'text-white'}
          `}
        />
      </div>
      <div className='flex items-center gap-3'>
        <p className='w-32 font-semibold text-lg'>Сообщение:</p>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Введите..."
          className={`pl-[16px] outline-none h-8 w-full 
            bg-transparent text-body-color bg-no-repeat 
            bg-[length:16px] bg-[25px_48%] font-body-font 
            font-semibold text-[15px] placeholder-input-chat-color
            border border-slate-300 rounded-lg
            ${context.colorMode.theme === 0 ? 'text-black' : 'text-white'}
          `}
        />
      </div>
      <button
        onClick={handleSendUser}
        className={`ml-auto max-w-[20vh] mt-4 bg-white p-2 
          rounded-lg hover:bg-blue-100 border border-slate-300
        `}
      >
        Отправить
      </button>
    </div>
  )
}

export default AddModal