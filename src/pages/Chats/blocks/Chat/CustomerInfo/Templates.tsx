import { FC } from 'react';
import Alco from './Alco';
import Body from './Body';
import Ero from './Ero';
import Flex from './Flex';
import Libido from './Libido';
import Man from './Man';
import Femiston from './Femiston';

type CertificatesProps = {
  customer_id: string;
  handleSendCertificate: (customer_id: string, product: string, type: string, i: number) => void;
};

const Templates: FC<CertificatesProps> = (props) => {
  const { customer_id, handleSendCertificate } = props;

  const css = {
    p: `
      text-md cursor-pointer
      hover:text-slate-400
      dark:hover:text-slate-400
      text-black dark:text-white
      select-none transition-all
      duration-300 ease-in-out
    `
  };

  return (
    <>
      <h1 className='font-bold text-xl text-black dark:text-white'>Шаблоны</h1>
      <Alco customer_id={customer_id} handleSendCertificate={handleSendCertificate}/>
      <Body customer_id={customer_id} handleSendCertificate={handleSendCertificate}/>
      <Ero customer_id={customer_id} handleSendCertificate={handleSendCertificate}/>
      <Flex customer_id={customer_id} handleSendCertificate={handleSendCertificate}/>
      <Libido customer_id={customer_id} handleSendCertificate={handleSendCertificate}/>
      <Man customer_id={customer_id} handleSendCertificate={handleSendCertificate}/>
      <Femiston customer_id={customer_id} handleSendCertificate={handleSendCertificate}/>
      <p
        className={css.p}
        onClick={() => handleSendCertificate(customer_id, 'halyk', 'qr', 1)}
      >
        8. Халык QR
      </p>
    </>
  );
};

export default Templates;
