import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import {
  ImageGallery,
  Searchbar,
  Modal,
  Loader,
  Notification,
  Button,
} from './index';
import { Container } from './App.styled';
import { fetchImages } from 'api/pixabayAPI';

export class App extends Component {
  state = {
    images: [],
    query: '',
    totalImages: 0,
    page: 1,
    status: 'idle',
    largeImage: '',
  };

  handleFormSubmit = query => {
    this.setState({
      query,
      page: 1,
    });
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  onModal = largeImage => {
    this.setState({ largeImage: largeImage });
  };

  onCloseModal = () => {
    this.setState({ largeImage: '' });
  };

  async componentDidUpdate(_, prevState) {
    const { query, page, images } = this.state;

    if (prevState.query === query && prevState.page === page) {
      return;
    }
    this.setState({ status: 'pending' });

    try {
      const data = await fetchImages(query, page);
      if (page === 1 && data.hits.length > 0) {
        toast.success(`We find ${data.totalHits} images`, {
          autoClose: 1500,
          theme: 'colored',
        });
      }

      if (data.hits.length === 0) {
        return this.setState({ status: 'empty', images: [] });
      }

      this.setState({
        images: page === 1 ? data.hits : [...images, ...data.hits],
        totalImages: data.totalHits,
        status: 'resolved',
      });
    } catch (error) {
      this.setState({ status: 'error' });
      console.log(error.message);
    }
  }

  render() {
    const { images, totalImages, page, status, largeImage } = this.state;
    const calcImages = totalImages - page * 12;

    return (
      <Container>
        <Searchbar onSubmit={this.handleFormSubmit} />

        <ImageGallery images={images} onModal={this.onModal} />

        {status === 'pending' && totalImages === 0 && <Loader />}

        {status === 'idle' && (
          <Notification message="Please find the image" status={status} />
        )}

        {status === 'empty' && (
          <Notification
            message="We didn't find anything, try to enter the correct query"
            status={status}
          />
        )}

        {status === 'error' && (
          <Notification
            message="Whoops, something went wrong, try again"
            status={status}
          />
        )}

        {calcImages > 0 && images.length > 0 && (
          <Button onLoadMore={this.onLoadMore} status={status} />
        )}

        {largeImage && (
          <Modal onClose={this.onCloseModal}>
            <img src={largeImage} alt="IMG" />
          </Modal>
        )}
        <ToastContainer />
      </Container>
    );
  }
}
