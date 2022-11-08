import PropTypes from 'prop-types';
import { ImageList } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, onModal }) => (
  <ImageList>
    {images.map(img => (
      <ImageGalleryItem
        key={img.id}
        smallImage={img.webformatURL}
        largeImage={img.largeImageURL}
        tags={img.tags}
        onModal={onModal}
      />
    ))}
  </ImageList>
);

ImageGallery.prototype = {
  images: PropTypes.array.isRequired,
  onModal: PropTypes.func.isRequired,
};
