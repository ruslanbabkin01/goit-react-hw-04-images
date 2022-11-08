import PropTypes from 'prop-types';
import { ImageItem, ItemImg } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  id,
  smallImage,
  tags,
  largeImage,
  onModal,
}) => (
  <ImageItem key={id}>
    <ItemImg
      src={smallImage}
      alt={tags}
      onClick={() => {
        onModal(largeImage);
      }}
    />
  </ImageItem>
);

ImageGalleryItem.propTypes = {
  id: PropTypes.string,
  tags: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  smallImage: PropTypes.string.isRequired,
  onModal: PropTypes.func.isRequired,
};
