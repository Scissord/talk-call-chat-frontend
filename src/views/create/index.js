import axios from 'axios';
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom';

const Create = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const orderId = searchParams.get('orderId');
  const phone = searchParams.get('phone');

  useEffect(() => {
    if(orderId && phone) {
      handleCreateOrder();
    };
  }, [orderId, phone])

  const handleCreateOrder = async () => {
    await axios({
      url: '/conversations',
      method: 'post',
      data: { orderId, phone }
    })
  };

  return (
    <>
      {!orderId || !phone ? (
        <div>Перейдите по ссылке с LeadVertex</div>
      ) : (
        <div>Create</div>
      )}
    </>
  )
}

export default Create;
