import axios from 'axios';

const API = axios.create({
  baseURL: 'http://192.168.0.136:3001', //ipv4 de casa
  // baseURL: 'http://192.168.137.61:3001', //ipv4 do trabalho
});

export default API;
