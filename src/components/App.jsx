import React, { Component } from 'react';
import { Loader } from './Loader/Loader';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { fetchImages } from './API';
import { GlobalStyle } from './GlobalStyle';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    totalPages: 0,
    error: null,
    loader: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.getImages();
    }
  }

  getImages = async () => {
    const { query, page } = this.state;
    const perPage = 12;

    try {
      this.setState({ loader: true });

      const data = await fetchImages(query, page);
      const arr = await data.hits.map(({ id, webformatURL, largeImageURL }) => {
        return { id, webformatURL, largeImageURL };
      });

      if (data.hits.length === 0) {
        toast.dismiss();
        toast.info('Sorry, image was not found...', {
          position: toast.POSITION.TOP_CENTER,
        });
        return;
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...arr],
        loader: false,
        error: null,
        totalPages: Math.ceil(data.totalHits / perPage),
      }));
    } catch (error) {
      this.setState({ error: 'error' });
    } finally {
      this.setState({ loader: false });
    }
  };

  changeQuery = newQuery => {
    this.setState({
      query: `${Date.now()}/${newQuery}`,
      images: [],
      page: 1,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, page, totalPages, loader } = this.state;

    return (
      <div>
        <ToastContainer transition={Slide} />
        <Searchbar changeQuery={this.changeQuery} />
        <ImageGallery images={images} />
        {loader && <Loader />}
        {images.length > 0 && totalPages !== page && !loader && (
          <Button onClick={this.handleLoadMore} />
        )}
        <GlobalStyle />
      </div>
    );
  }
}
