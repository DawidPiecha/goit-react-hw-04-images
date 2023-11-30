import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ imageUrl, alt, onImageClick }) => (
  <li className={css.ImageGalleryItem}>
    <img
      className={css.ImageGalleryItemImage}
      src={imageUrl}
      alt={alt}
      onClick={onImageClick}
    />
  </li>
);

ImageGalleryItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export { ImageGalleryItem };
