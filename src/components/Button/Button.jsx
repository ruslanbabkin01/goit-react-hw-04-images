import { Btn } from './Button.styled';
import PropTypes from 'prop-types';
import { Loader } from 'components/Loader/Loader';

export const Button = ({ onLoadMore, status }) => (
  <>
    {status === 'pending' ? (
      <Loader />
    ) : (
      <Btn onClick={onLoadMore}>Load more</Btn>
    )}
  </>
);

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
};
