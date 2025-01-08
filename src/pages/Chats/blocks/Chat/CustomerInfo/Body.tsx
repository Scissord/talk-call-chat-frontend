import { FC, useState } from 'react';

type BodyProps = {
  customer_id: string;
  handleSendCertificate: (customer_id: string, product: string, type: string, i: number) => void;
};

const Body: FC<BodyProps> = (props) => {
  const { customer_id, handleSendCertificate } = props;
  const [isBodyOpen, setIsBodyOpen] = useState(false);

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
    { id: 'cert', label: '2.1 Сертификат', i: 1 },
    { id: 'audio', label: '2.2 Аудио отзыв после родов', i: 1 },
    { id: 'image', label: '2.3 Фото отзыв до/после похудения', i: 1 },
    { id: 'image', label: '2.3 Фото отзыв больше не переедает', i: 2 },
    { id: 'image', label: '2.3 Фото отзыв чувствую облегчение', i: 3 },
    { id: 'image', label: '2.3 Фото отзыв 97 -> 80 кг', i: 4 },
    { id: 'pic', label: '2.4 Фото продукта', i: 1 },
  ];

  return (
    <>
      <p
        className={css.p}
        onClick={() => setIsBodyOpen(!isBodyOpen)}
      >
        2. BodyBalance
      </p>
      {isBodyOpen && (
        <div className="flex flex-col gap-3 border px-2 py-2 w-full">
          {items.map((item) => (
            <p
              key={item.id}
              className={css.p}
              onClick={() => handleSendCertificate(customer_id, 'body', item.id, item.i)}
            >
              {item.label}
            </p>
          ))}
        </div>
      )}
    </>
  );
};

export default Body;
