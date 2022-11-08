import PropTypes from 'prop-types';
import { Picture, Container } from './Notification.styled';
import pict from '../../images/img_.jpg';

export const Notification = ({ message, status }) => (
  <Container>
    {status === 'idle' && <Picture src={pict} alt="#" />}
    {status === 'empty' && <p>{message}</p>}
    {status === 'error' && <p>{message}</p>}
  </Container>
);

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};
