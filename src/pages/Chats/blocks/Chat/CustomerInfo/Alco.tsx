import { FC, useState } from 'react';

type AlcoProps = {
  customer_id: string;
  handleSendCertificate: (customer_id: string, product: string, type: string, i: number) => void;
};

const Alco: FC<AlcoProps> = (props) => {
  const { customer_id, handleSendCertificate } = props;
  const [isAlcoOpen, setIsAlcoOpen] = useState(false);

  const css = {
    p: `
      text-md cursor-pointer
      hover:text-slate-400
      dark:hover:text-slate-400
      text-black dark:text-white
      select-none transition-all
      duration-300 ease-in-out
    `,
  };

  const items = [
    { id: 'cert', label: '1.1 Сертификат', i: 1 },
    { id: 'image', label: '1.2 Фото отзыв против алкоголя', i: 1 },
    { id: 'image', label: '1.2 Фото отзыв жена не боится мужа', i: 2 },
    { id: 'pic', label: '1.3 Фото продукта', i: 1 },
  ];

  return (
    <>
      <p
        className={css.p}
        onClick={() => setIsAlcoOpen(!isAlcoOpen)}
      >
        1. AlcoBalance
      </p>
      {isAlcoOpen && (
        <div className="flex flex-col gap-3 border px-2 py-2 w-full">
          {items.map((item) => (
            <p
              key={item.id}
              className={css.p}
              onClick={() => handleSendCertificate(customer_id, 'alco', item.id, item.i)}
            >
              {item.label}
            </p>
          ))}
        </div>
      )}
    </>
  );
};

export default Alco;
