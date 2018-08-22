import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'http://localhost:3000/api';

const encode = encodeURIComponent;
const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
}
 
const requests = {
  del: url =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: url =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
}; 

const pglimit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;
const omitSlug = meme => Object.assign({}, meme, { slug: undefined }); 
const Memes = {
  getAll: () => requests.get('/memes'),
  all: page =>
    requests.get(`/memes?${pglimit(12, page)}`), 
  get: slug =>
    requests.get(`/memes/${slug}`),
  del: slug =>
    requests.del(`/memes/${slug}`),
  yourMeme: () =>
    requests.get('/memes/feed?limit=12&offset=0'),
  favorite: id =>
    requests.post(`/memes/${id}/favorite`),
  unfavorite: id =>
    requests.del(`/memes/${id}/favorite`),
  byAuthor: (author, page) =>
    requests.get(`/memes?author=${encode(author)}&${pglimit(12, page)}`),
  update: meme =>
    requests.put(`/memes/${meme.slug}`, { meme: omitSlug(meme) }),
  create: meme =>
    requests.post('/memes', { meme })
};

const Auth = {
  current: () =>
    requests.get('/user'),
  login: (email, password) =>
    requests.post('/users/login', { user: { email, password } }),
  register: (username, email, password) =>
    requests.post('/users', { user: { username, email, password } }),
  save: user =>
    requests.put('/user', { user })
};
 
const Profile = {
  follow: username =>
    requests.post(`/profiles/${username}/follow`),
  get: username =>
    requests.get(`/profiles/${username}`),
  unfollow: username =>
    requests.del(`/profiles/${username}/follow`)
};

export default { 
  Auth,
  Memes, 
  Profile, 
  setToken: _token => { token = _token; }
};
