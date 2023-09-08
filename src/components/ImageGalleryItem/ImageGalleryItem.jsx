import React, { useState } from 'react';
import { GalleryListImage } from './ImageGalleryItem.styled';
import { CustomModal } from 'components/Modal/Modal';

export const ImageGalleryItem = ({ image }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    setIsLoadingImage(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleImageLoad = () => setIsLoadingImage(false);

  const handleImageError = () => {
    setIsLoadingImage(false);
    console.error('Error loading image');
  };

  return (
    <>
      <GalleryListImage
        onClick={openModal}
        src={image.webformatURL}
        alt="Description of the image"
      ></GalleryListImage>
      <CustomModal
        isOpen={isModalOpen}
        onModalClose={closeModal}
        isLoadingImage={isLoadingImage}
        image={image.largeImageURL}
        onError={handleImageError}
        onLoad={handleImageLoad}
      />
    </>
  );
};
