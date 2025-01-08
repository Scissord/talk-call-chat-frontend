import { FC, useState } from 'react';

type FlexProps = {
  customer_id: string;
  handleSendCertificate: (customer_id: string, product: string, type: string, i: number) => void;
};

const Flex: FC<FlexProps> = (props) => {
  const { customer_id, handleSendCertificate } = props;
  const [isFlexOpen, setIsFlexOpen] = useState(false);

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
    { id: 'cert', label: '4.1 Сертификат', i: 1 },
    { id: 'audio', label: '4.2 Аудио отзыв улучшение подвижности', i: 1 },
    { id: 'audio', label: '4.2 Аудио отзыв суставы улучшились', i: 2 },
    { id: 'audio', label: '4.2 Аудио отзыв улучшение подвижности', i: 3 },
    { id: 'audio', label: '4.2 Аудио отзыв легкие движения', i: 4 },
    { id: 'audio', label: '4.2 Аудио отзыв ногам стало лучше', i: 5 },
    { id: 'audio', label: '4.2 Аудио отзыв улучшение', i: 6 },
    { id: 'audio', label: '4.2 Аудио отзыв посоветовала другу', i: 7 },
    { id: 'audio', label: '4.2 Аудио отзыв лучше во всем', i: 8 },
    { id: 'audio', label: '4.2 Аудио отзыв улучшение подвижности', i: 9 },
    { id: 'audio', label: '4.2 Аудио отзыв улучшение подвижности', i: 10 },
    { id: 'image', label: '4.3 Фото отзыв бабушке стало легче', i: 1 },
    { id: 'image', label: '4.3 Фото отзыв у дедушки ничего не болит', i: 2 },
    { id: 'image', label: '4.3 Фото отзыв улучшение подвижности', i: 3 },
    { id: 'image', label: '4.3 Фото отзыв быстрый эффект', i: 4 },
    { id: 'image', label: '4.3 Фото отзыв после 30 лет боли', i: 5 },
    { id: 'image', label: '4.3 Фото отзыв помогает', i: 6 },
    { id: 'pic', label: '4.4 Фото продукта', i: 1 },
  ];

  return (
    <>
      <p
        className={css.p}
        onClick={() => setIsFlexOpen(!isFlexOpen)}
      >
        4. FlexBalance
      </p>
      {isFlexOpen && (
        <div className="flex flex-col gap-3 border px-2 py-2 w-full">
          {items.map((item) => (
            <p
              key={item.id}
              className={css.p}
              onClick={() => handleSendCertificate(customer_id, 'flex', item.id, item.i)}
            >
              {item.label}
            </p>
          ))}
        </div>
      )}
    </>
  );
};

export default Flex;
