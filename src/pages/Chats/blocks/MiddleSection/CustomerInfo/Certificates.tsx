import { FC } from 'react';

type CertificatesProps = {
  setFile: (obj: File) => void;
  setMessage: (val: string) => void;
  setLoading: (val: boolean) => void;
};

const Certificates: FC<CertificatesProps> = (props) => {
  const { setLoading, setMessage, setFile } = props;

  const handleSetCert = async (url: string) => {
    setLoading(true);
    const response = await fetch(url);
    if (!response.ok) throw new Error('Image fetch failed');

    const name = url.split('/').pop() || 'cert.jpg';

    const blob = await response.blob();
    const file = new File([blob], name, { type: 'image/jpeg' });
    setMessage("");
    setFile(file);
    setLoading(false);
  };

  return (
    <>
      <p
        className={`
          text-md cursor-pointer hover:text-gray-300
          text-black dark:text-white
        `}
        onClick={() => handleSetCert('/templates/alco-cert.jpg')}
      >
        1. AlcoBalance
      </p>
      <p
        className={`
          text-md cursor-pointer hover:text-gray-300
          text-black dark:text-white
        `}
        onClick={() => handleSetCert('/templates/body-cert.jpg')}
      >
        2. BodyBalance
      </p>
      <p
        className={`
          text-md cursor-pointer hover:text-gray-300
          text-black dark:text-white
        `}
        onClick={() => handleSetCert('/templates/ero-cert.jpg')}
      >
        3. EroKing
      </p>
      <p
        className={`
          text-md cursor-pointer hover:text-gray-300
          text-black dark:text-white
        `}
        onClick={() => handleSetCert('/templates/flex-cert.jpg')}
      >
        4. FlexBalance
      </p>
      <p
        className={`
          text-md cursor-pointer hover:text-gray-300
        text-black dark:text-white
        `}
        onClick={() => handleSetCert('/templates/libido-cert.jpg')}
      >
        4. LibidoBalance
      </p>
      <p
        className={`
          text-md cursor-pointer hover:text-gray-300
          text-black dark:text-white
        `}
        onClick={() => handleSetCert('/templates/man-cert.jpg')}
      >
        4. ManBalance
      </p>
    </>
  );
};

export default Certificates;
