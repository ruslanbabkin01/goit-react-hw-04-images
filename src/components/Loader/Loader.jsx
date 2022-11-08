import { ThreeCircles } from 'react-loader-spinner';
import { LoadContainer } from './Loader.styled';

export const Loader = () => (
  <LoadContainer>
    <ThreeCircles
      height="100"
      width="100"
      color="#4fa94d"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="three-circles-rotating"
      outerCircleColor=""
      innerCircleColor=""
      middleCircleColor=""
    />
  </LoadContainer>
);

export default Loader;
