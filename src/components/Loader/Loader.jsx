import { Oval } from 'react-loader-spinner';
import { LoaderThumb } from './Loader.styled';

export const Loader = () => {
  return (
    <LoaderThumb>
      <Oval
        height={40}
        width={40}
        color="#a94f4d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#a94f4d"
        strokeWidth={6}
        strokeWidthSecondary={6}
      />
    </LoaderThumb>
  );
};
