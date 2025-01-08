import { FC, useState } from 'react';

type EroProps = {
  customer_id: string;
  handleSendCertificate: (customer_id: string, product: string, type: string, i: number) => void;
};

const Ero: FC<EroProps> = (props) => {
  const { customer_id, handleSendCertificate } = props;
  const [isEroOpen, setIsEroOpen] = useState(false);

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
    { id: 'cert', label: '3.1 Сертификат', i: 1 },
    { id: 'image', label: '3.2 Фото отзыв +4см', i: 1 },
    { id: 'image', label: '3.2 Фото отзыв +потенция', i: 2 },
    { id: 'image', label: '3.2 Фото отзыв улучшение половых желез', i: 3 },
    { id: 'image', label: '3.2 Фото отзыв бурная ночь', i: 4 },
    { id: 'image', label: '3.2 Фото отзыв фото полового органа', i: 5 },
    { id: 'image', label: '3.2 Фото отзыв положительный эффект', i: 6 },
    { id: 'pic', label: '3.3 Фото продукта', i: 1 },
  ];

  return (
    <>
      <p
        className={css.p}
        onClick={() => setIsEroOpen(!isEroOpen)}
      >
        3. EroKing
      </p>
      {isEroOpen && (
        <div className="flex flex-col gap-3 border px-2 py-2 w-full">
          {items.map((item) => (
            <p
              key={item.id}
              className={css.p}
              onClick={() => handleSendCertificate(customer_id, 'ero', item.id, item.i)}
            >
              {item.label}
            </p>
          ))}
        </div>
      )}
    </>
  );
};

export default Ero;
