import PropTypes from 'prop-types';
import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const apiKey = '39858115-22d22e85d671686e754408071';
const imagesPerPage = 12;

const fetchImageGallery = async (searchInputTerm, page) => {
  const url = `?q=${searchInputTerm}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${imagesPerPage}`;
  try {
    const response = await axios.get(url);

    return new Promise(resolve => {
      setTimeout(() => {
        resolve(response.data);
      }, 2000);
    });
  } catch (error) {
    console.log('fetchImageGallery error:', error);
  }
};

fetchImageGallery.propTypes = {
  searchInputTerm: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};

export { fetchImageGallery };
