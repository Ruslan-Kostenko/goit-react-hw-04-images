import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '38312706-7f49ec212361a9f63e3040077';

export const fetchImages = async (query, page) => {
  const slicedQuery = query.slice(query.indexOf('/') + 1);
  const response = await axios.get(
    `?q=${slicedQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data;
};
