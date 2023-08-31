import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { StyledGalleryList } from './ImageGallery.styled';

export const ImageGallery = ({ images }) => {
  return (
    <StyledGalleryList className="gallery">
      {images.map(image => {
        return (
          <li key={image.id}>
            <ImageGalleryItem image={image} />
          </li>
        );
      })}
    </StyledGalleryList>
  );
};
