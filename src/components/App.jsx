import React, { useEffect, useState } from 'react';
import { Loader } from './Loader/Loader';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { fetchImages } from './API';
import { GlobalStyle } from './GlobalStyle';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (query === '') return;

    const getImages = async () => {
      const perPage = 12;

      try {
        setLoader(true);

        const data = await fetchImages(query, page);
        const arr = await data.hits.map(
          ({ id, webformatURL, largeImageURL }) => {
            return { id, webformatURL, largeImageURL };
          }
        );

        if (data.hits.length === 0) {
          toast.dismiss();
          toast.info('Sorry, image was not found...', {
            position: toast.POSITION.TOP_RIGHT,
          });
          return;
        }

        setImages(prevState => [...prevState, ...arr]);
        setLoader(false);
        setTotalPages(Math.ceil(data.totalHits / perPage));
      } catch (error) {
        toast.info('Sorry, image was not found...', {
          position: toast.POSITION.TOP_RIGHT,
        });
      } finally {
        setLoader(false);
      }
    };

    getImages();
  }, [query, page]);

  const changeQuery = newQuery => {
    setQuery(`${Date.now()}/${newQuery}`);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => setPage(prevState => prevState + 1);

  return (
    <div>
      <ToastContainer transition={Slide} />
      <Searchbar changeQuery={changeQuery} />
      <ImageGallery images={images} />
      {loader && <Loader />}
      {images.length > 0 && totalPages !== page && !loader && (
        <Button onClick={handleLoadMore} />
      )}
      <GlobalStyle />
    </div>
  );
};
