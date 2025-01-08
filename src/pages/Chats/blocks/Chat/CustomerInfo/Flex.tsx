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
    { id: 'audio', label: '4.2 Аудио отзыв 1', i: 1 },
    { id: 'audio', label: '4.2 Аудио отзыв 2', i: 2 },
    { id: 'audio', label: '4.2 Аудио отзыв 3', i: 3 },
    { id: 'audio', label: '4.2 Аудио отзыв 4', i: 4 },
    { id: 'audio', label: '4.2 Аудио отзыв 5', i: 5 },
    { id: 'audio', label: '4.2 Аудио отзыв 6', i: 6 },
    { id: 'audio', label: '4.2 Аудио отзыв 7', i: 7 },
    { id: 'audio', label: '4.2 Аудио отзыв 8', i: 8 },
    { id: 'audio', label: '4.2 Аудио отзыв 9', i: 9 },
    { id: 'audio', label: '4.2 Аудио отзыв 10', i: 10 },
    { id: 'image', label: '4.3 Фото отзыв 1', i: 1 },
    { id: 'image', label: '4.3 Фото отзыв 2', i: 2 },
    { id: 'image', label: '4.3 Фото отзыв 3', i: 3 },
    { id: 'image', label: '4.3 Фото отзыв 4', i: 4 },
    { id: 'image', label: '4.3 Фото отзыв 5', i: 5 },
    { id: 'image', label: '4.3 Фото отзыв 6', i: 6 },
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
