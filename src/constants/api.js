import axios from 'axios';

const API = axios.create({
  // baseURL: 'http://192.168.0.127:3001', //ipv4 de casa
  baseURL: 'http://192.168.137.110:3001', //ipv4 do trabalho
});

export default API;
