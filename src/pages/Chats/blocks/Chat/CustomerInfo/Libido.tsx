import { FC, useState } from 'react';

type LibidoProps = {
  customer_id: string;
  handleSendCertificate: (customer_id: string, product: string, type: string, i: number) => void;
};

const Libido: FC<LibidoProps> = (props) => {
  const { customer_id, handleSendCertificate } = props;
  const [isLibidoOpen, setIsLibidoOpen] = useState(false);

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
    { id: 'cert', label: '5.1 Сертификат', i: 1 },
    { id: 'audio', label: '5.2 Аудио отзыв', i: 1 },
    { id: 'image', label: '5.3 Фото отзыв 1', i: 1 },
    { id: 'image', label: '5.3 Фото отзыв 2', i: 2 },
    { id: 'image', label: '5.3 Фото отзыв 3', i: 3 },
    { id: 'image', label: '5.3 Фото отзыв 4', i: 4 },
    { id: 'image', label: '5.3 Фото отзыв 5', i: 5 },
    { id: 'image', label: '5.3 Фото отзыв 6', i: 6 },
    { id: 'pic', label: '5.4 Фото продукта', i: 1 },
  ];

  return (
    <>
      <p
        className={css.p}
        onClick={() => setIsLibidoOpen(!isLibidoOpen)}
      >
        5. LibidoFortis
      </p>
      {isLibidoOpen && (
        <div className="flex flex-col gap-3 border px-2 py-2 w-full">
          {items.map((item) => (
            <p
              key={item.id}
              className={css.p}
              onClick={() => handleSendCertificate(customer_id, 'libido', item.id, item.i)}
            >
              {item.label}
            </p>
          ))}
        </div>
      )}
    </>
  );
};

export default Libido;
