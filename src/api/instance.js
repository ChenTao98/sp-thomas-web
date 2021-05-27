import axios from 'axios'

const instance=axios.create({
    baseURL: 'http://localhost:18081/api/',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    withCredentials: true
  });
axios.defaults.withCredentials=true;
export default instance