import axios from 'axios';

// Base instance — swap BASE_URL for your real backend
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://api.webxter.com/v1',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('webxter_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401 globally — clear token and reload to login
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('webxter_token');
      localStorage.removeItem('webxter_user');
      window.location.reload();
    }
    return Promise.reject(err);
  }
);

/* ── Auth ── */
export const authAPI = {
  login: (email, password) =>
    api.post('/auth/login', { email, password }),

  signup: (name, email, password) =>
    api.post('/auth/signup', { name, email, password }),

  googleAuth: (token) =>
    api.post('/auth/google', { token }),

  logout: () =>
    api.post('/auth/logout'),

  getMe: () =>
    api.get('/auth/me'),
};

/* ── Courses ── */
export const coursesAPI = {
  getAll: () =>
    api.get('/courses'),

  getEnrolled: () =>
    api.get('/courses/enrolled'),

  getCatalog: () =>
    api.get('/courses/catalog'),

  enroll: (courseId) =>
    api.post(`/courses/${courseId}/enroll`),

  getById: (courseId) =>
    api.get(`/courses/${courseId}`),
};

/* ── Lectures ── */
export const lecturesAPI = {
  getByCourse: (courseId) =>
    api.get(`/courses/${courseId}/lectures`),

  markDone: (courseId, lectureId) =>
    api.patch(`/courses/${courseId}/lectures/${lectureId}/complete`),

  markUndone: (courseId, lectureId) =>
    api.patch(`/courses/${courseId}/lectures/${lectureId}/incomplete`),
};

/* ── Notes ── */
export const notesAPI = {
  save: (courseId, lectureId, content) =>
    api.put(`/courses/${courseId}/lectures/${lectureId}/notes`, { content }),

  get: (courseId, lectureId) =>
    api.get(`/courses/${courseId}/lectures/${lectureId}/notes`),

  getAll: () =>
    api.get('/notes'),
};

/* ── Certificates ── */
export const certificatesAPI = {
  getAll: () =>
    api.get('/certificates'),

  getById: (certId) =>
    api.get(`/certificates/${certId}`),

  download: (certId) =>
    api.get(`/certificates/${certId}/download`, { responseType: 'blob' }),
};

/* ── User ── */
export const userAPI = {
  updateProfile: (data) =>
    api.patch('/user/profile', data),

  changePassword: (current, newPassword) =>
    api.patch('/user/password', { current, newPassword }),
};

export default api;
