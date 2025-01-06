import { FC, useState } from 'react';

type CertificatesProps = {
  customer_id: string;
  handleSendCertificate: (customer_id: string, product: string, type: string) => void;
};

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

const Templates: FC<CertificatesProps> = (props) => {
  const { customer_id, handleSendCertificate } = props;
  const [isAlcoOpen, setIsAlcoOpen] = useState(false);
  const [isBodyOpen, setIsBodyOpen] = useState(false);
  const [isEroOpen, setIsEroOpen] = useState(false);
  const [isFlexOpen, setIsFlexOpen] = useState(false);
  const [isLibidoOpen, setIsLibidoOpen] = useState(false);
  const [isManOpen, setIsManOpen] = useState(false);

  return (
    <>
      <h1 className='font-bold text-xl text-black dark:text-white'>Шаблоны</h1>
      <p
        className={css.p}
        onClick={() => setIsAlcoOpen(!isAlcoOpen)}
      >
        1. AlcoBalance
      </p>
      {isAlcoOpen && (
        <div className='flex flex-col gap-3 border px-4 py-2 w-full'>
          <p
            className={css.p}
            onClick={() => handleSendCertificate(customer_id, 'alco', 'cert')} 
          >
            1.1 Сертификат
          </p>
          <p
            className={css.p}
            onClick={() => handleSendCertificate(customer_id, 'alco', 'audio')} 
          >
            1.2 Аудио отзыв
          </p>
          <p
            className={css.p}
            onClick={() => handleSendCertificate(customer_id, 'alco', 'image')} 
          >
            1.3 Фото отзыв
          </p>
          <p
            className={css.p}
            onClick={() => handleSendCertificate(customer_id, 'alco', 'pic')} 
          >
            1.4 Фото продукта
          </p>
        </div>
      )}
      <p
        className={css.p}
        onClick={() => setIsBodyOpen(!isBodyOpen)}
      >
        2. BodyBalance
      </p>
      {isBodyOpen && (
        <div className='flex flex-col gap-3 border px-2 py-2 w-full'>
          <p
            className={css.p}
            onClick={() => handleSendCertificate(customer_id, 'body', 'cert')} 
          >
            2.1 Сертификат
          </p>
          <p
            className={css.p}
            onClick={() => handleSendCertificate(customer_id, 'body', 'audio')} 
          >
            2.2 Аудио отзыв
          </p>
          <p
            className={css.p}
            onClick={() => handleSendCertificate(customer_id, 'body', 'image')} 
          >
            2.3 Фото отзыв
          </p>
          <p
            className={css.p}
            onClick={() => handleSendCertificate(customer_id, 'body', 'pic')} 
          >
            2.4 Фото продукта
          </p>
        </div>
      )}
      <p
        className={css.p}
        onClick={() => setIsEroOpen(!isEroOpen)}
      >
        3. EroKing
      </p>
      {isEroOpen && (
        <div className='flex flex-col gap-3 border px-2 py-2 w-full'>
          <p
            className={css.p}
            onClick={() => handleSendCertificate(customer_id, 'ero', 'cert')} 
          >
            3.1 Сертификат
          </p>
          <p
            className={css.p}
            onClick={() => handleSendCertificate(customer_id, 'ero', 'audio')} 
          >
            3.2 Аудио отзыв
          </p>
          <p
            className={css.p}
            onClick={() => handleSendCertificate(customer_id, 'ero', 'image')} 
          >
            3.3 Фото отзыв
          </p>
          <p
            className={css.p}
            onClick={() => handleSendCertificate(customer_id, 'ero', 'pic')} 
          >
            3.4 Фото продукта
          </p>
        </div>
      )}
      <p
        className={css.p}
        onClick={() => setIsFlexOpen(!isFlexOpen)}
      >
        4. FlexBalance
      </p>
      {isFlexOpen && (
        <div className='flex flex-col gap-3 border px-2 py-2 w-full'>
          <p
            className={css.p}
            onClick={() => handleSendCertificate(customer_id, 'flex', 'cert')} 
          >
            4.1 Сертификат
          </p>
          <p
            className={css.p}
            onClick={() => handleSendCertificate(customer_id, 'flex', 'audio')} 
          >
            4.2 Аудио отзыв
          </p>
          <p
            className={css.p}
            onClick={() => handleSendCertificate(customer_id, 'flex', 'image')} 
          >
            4.3 Фото отзыв
          </p>
          <p
            className={css.p}
            onClick={() => handleSendCertificate(customer_id, 'flex', 'pic')} 
          >
            4.4 Фото продукта
          </p>
        </div>
      )}
      <p
        className={css.p}
        onClick={() => setIsLibidoOpen(!isLibidoOpen)}
      >
        5. LibidoBalance
      </p>
      {isLibidoOpen && (
        <div className='flex flex-col gap-3 border px-2 py-2 w-full'>
          <p
            className={css.p}
            onClick={() => handleSendCertificate(customer_id, 'libido', 'cert')} 
          >
            5.1 Сертификат
          </p>
          <p
            className={css.p}
            onClick={() => handleSendCertificate(customer_id, 'libido', 'audio')} 
          >
            5.2 Аудио отзыв
          </p>
          <p
            className={css.p}
            onClick={() => handleSendCertificate(customer_id, 'libido', 'image')} 
          >
            5.3 Фото отзыв
          </p>
          <p
            className={css.p}
            onClick={() => handleSendCertificate(customer_id, 'libido', 'pic')} 
          >
            5.4 Фото продукта
          </p>
        </div>
      )}
      <p
        className={css.p}
        onClick={() => setIsManOpen(!isManOpen)}
      >
        6. ManBalance
      </p>
      {isManOpen && (
        <div className='flex flex-col gap-3 border px-2 py-2 w-full'>
          <p
            className={css.p}
            onClick={() => handleSendCertificate(customer_id, 'man', 'cert')} 
          >
            6.1 Сертификат
          </p>
          <p
            className={css.p}
            onClick={() => handleSendCertificate(customer_id, 'man', 'audio')} 
          >
            6.2 Аудио отзыв
          </p>
          <p
            className={css.p}
            onClick={() => handleSendCertificate(customer_id, 'man', 'image')} 
          >
            6.3 Фото отзыв
          </p>
          <p
            className={css.p}
            onClick={() => handleSendCertificate(customer_id, 'man', 'pic')} 
          >
            6.4 Фото продукта
          </p>
        </div>
      )}
    </>
  );
};

export default Templates;
