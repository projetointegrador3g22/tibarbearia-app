import axios from 'axios';

const API = axios.create({
  baseURL: 'http://192.168.0.130:3001', //ipv4 de casa
  // baseURL: 'http://192.168.137.196:3001' //ipv4 do trabalho
});

export default API;
