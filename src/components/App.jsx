import { useState, useEffect } from 'react';
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

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [totalImages, setTotalImages] = useState(0);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [largeImage, setLargeImage] = useState('');
  const calcImages = totalImages - page * 12;

  const handleFormSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const onLoadMore = () => setPage(prevPage => prevPage + 1);

  const onModal = largeImage => setLargeImage(largeImage);

  const onCloseModal = () => setLargeImage('');

  useEffect(() => {
    if (!query) return;

    setStatus('pending');
    async function getImages(query, page) {
      try {
        const data = await fetchImages(query, page);
        setImages(prevImages => [...prevImages, ...data.hits]);
        setTotalImages(data.totalHits);
        setStatus('resolved');

        if (page === 1 && data.hits.length > 0) {
          toast.success(`We find ${data.totalHits} images`, {
            autoClose: 1500,
            theme: 'colored',
          });
        }

        if (data.hits.length === 0) {
          setStatus('empty');
          setImages([]);
          return;
        }

        if (page === 1) {
          setImages(data.hits);
          return;
        }
      } catch (error) {
        setStatus('error');
        console.log(error.message);
      }
    }
    getImages(query, page);
  }, [page, query]);

  return (
    <Container>
      <Searchbar onSubmit={handleFormSubmit} />

      <ImageGallery images={images} onModal={onModal} />

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
        <Button onLoadMore={onLoadMore} status={status} />
      )}

      {largeImage && (
        <Modal onClose={onCloseModal}>
          <img src={largeImage} alt="IMG" />
        </Modal>
      )}
      <ToastContainer />
    </Container>
  );
};
