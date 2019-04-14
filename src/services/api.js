import axios from 'axios';

const api = axios.create({
  baseURL: 'https://bolota-share-torrent.herokuapp.com',
  headers: {
    crossdomain: true
  }
});

export default api;
