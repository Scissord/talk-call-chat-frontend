import { FC, useState } from 'react';

type FemistonProps = {
  customer_id: string;
  handleSendCertificate: (customer_id: string, product: string, type: string, i: number) => void;
};

const Femiston: FC<FemistonProps> = (props) => {
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
    { id: 'cert', label: '7.1 Сертификат', i: 1 },
    { id: 'image', label: '7.2 Фото отзыв', i: 1 },
    { id: 'audio', label: '7.3 Аудио отзыв', i: 1 },
  ];

  return (
    <>
      <p
        className={css.p}
        onClick={() => setIsEroOpen(!isEroOpen)}
      >
        7. Femiston
      </p>
      {isEroOpen && (
        <div className="flex flex-col gap-3 border px-2 py-2 w-full">
          {items.map((item) => (
            <p
              key={item.id}
              className={css.p}
              onClick={() => handleSendCertificate(customer_id, 'femiston', item.id, item.i)}
            >
              {item.label}
            </p>
          ))}
        </div>
      )}
    </>
  );
};

export default Femiston;
