import React, { Component } from 'react';
import { fetchImageGallery } from '../Api/ImagesApi';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Notify } from 'notiflix';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

class App extends Component {
  state = {
    images: [],
    page: 1,
    searchTerm: '',
    totalImages: null,
    isLoading: false,
    showModal: false,
    selectedImage: '',
  };

  handleSearch = async searchTerm => {
    this.setState({ isLoading: true });

    const { page } = this.state;

    //jeśli zawartość inputa jest pusta następuje blokada wyszukiwania i komunikat dla użytkownika

    if (searchTerm.trim() === '') {
      this.setState({ isLoading: false });
      Notify.info('Please enter a term to search something');
      return;
    }
    try {
      const data = await fetchImageGallery(searchTerm, page);

      if (data.hits) {
        this.setState(
          {
            images: data.hits,
            searchTerm,
            page: 1,
            totalImages: data.totalHits,
          },
          () => {
            if (data.totalHits === 0) {
              this.setState({ images: [] });
              Notify.failure(
                `Sorry, There's no images for "${searchTerm.toUpperCase()}" `
              );
            } else if (data.totalHits <= 12) {
              Notify.success(
                `We have found ${
                  data.totalHits
                } images for "${searchTerm.toUpperCase()}" `
              );
            } else {
              Notify.success(
                `We have found ${
                  data.totalHits
                } images for "${searchTerm.toUpperCase()}". You can LOAD MORE!`
              );
            }
          }
        );
      }
    } catch (error) {
      Notify.failure('Oops! Something went wrong while fetching images.');
      console.log('Error fetching images:', error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  loadMoreImages = async () => {
    this.setState({ isLoading: true });

    const { searchTerm, page } = this.state;

    try {
      const nextPage = page + 1;
      const data = await fetchImageGallery(searchTerm, nextPage);

      if (data.hits) {
        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
          page: nextPage,
        }));
      }
    } catch (error) {
      Notify.failure('Oops! Something went wrong while fetching images.');
      console.log('Error fetching more images:', error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleImageClick = imageUrl => {
    this.setState({ showModal: true, selectedImage: imageUrl });
  };
  handleModalClose = () => {
    this.setState({ showModal: false, selectedImage: '' });
  };

  render() {
    const { images, page, totalImages, isLoading, showModal, selectedImage } =
      this.state;
    const hasMoreImages = images.length >= page * 12;
    const noMoreImages = images.length === totalImages;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery images={images} onImageClick={this.handleImageClick} />
        {isLoading && <Loader />}
        {hasMoreImages && (
          <>
            <p className="infoForUser">{`We've already found ${
              images.length
            } ${this.state.searchTerm.toUpperCase()} images from ${totalImages} available.`}</p>
            <Button onClick={this.loadMoreImages} disabled={false} />
          </>
        )}
        {noMoreImages && (
          <p className="infoForUser">{`We've already found ${
            images.length
          } ${this.state.searchTerm.toUpperCase()} images from ${totalImages} available.`}</p>
        )}
        {showModal && (
          <Modal
            imageUrl={selectedImage}
            onModalClose={this.handleModalClose}
            showModal={showModal}
          />
        )}
      </div>
    );
  }
}

export { App };
