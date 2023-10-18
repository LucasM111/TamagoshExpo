import axios from 'axios';
import user from './store/user';

const instanciar = axios.create({
  baseURL: 'https://tamagochiapi-clpsampedro.b4a.run',
});

instanciar.interceptors.request.use(request => {
  const { token } = user.getState();

  if (token) {
    request.headers['x-access-token'] = token;

  }
  return request;
});

export default instanciar;