import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Add store ID if available
        const storeId = localStorage.getItem('currentStoreId');
        if (storeId && !config.url?.includes('/auth') && !config.url?.includes('/stores')) {
            config.headers['X-Store-Id'] = storeId;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle errors
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If token expired, try to refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');
                const response = await axios.post(`${API_URL}/auth/refresh-token`, {
                    refreshToken,
                });

                const { accessToken } = response.data.data;
                localStorage.setItem('accessToken', accessToken);

                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return apiClient(originalRequest);
            } catch (refreshError) {
                // Refresh failed, logout user
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('user');
                window.location.href = '/';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

// Auth API
export const authAPI = {
    register: (data) => apiClient.post('/auth/register', data),
    login: (data) => apiClient.post('/auth/login', data),
    logout: () => apiClient.post('/auth/logout'),
    getProfile: () => apiClient.get('/auth/me'),
    refreshToken: (refreshToken) => apiClient.post('/auth/refresh-token', { refreshToken }),
};

// Store API
export const storeAPI = {
    getAll: () => apiClient.get('/stores'),
    create: (data) => apiClient.post('/stores', data),
    getById: (id) => apiClient.get(`/stores/${id}`),
    update: (id, data) => apiClient.put(`/stores/${id}`, data),
    delete: (id) => apiClient.delete(`/stores/${id}`),
    getTeam: (id) => apiClient.get(`/stores/${id}/team`),
    addTeamMember: (id, data) => apiClient.post(`/stores/${id}/team`, data),
    removeTeamMember: (id, userId) => apiClient.delete(`/stores/${id}/team/${userId}`),
    updateTeamMember: (id, userId, data) => apiClient.put(`/stores/${id}/team/${userId}`, data),
};

// Product API
export const productAPI = {
    getAll: (params) => apiClient.get('/products', { params }),
    create: (data) => apiClient.post('/products', data),
    getById: (id) => apiClient.get(`/products/${id}`),
    update: (id, data) => apiClient.put(`/products/${id}`, data),
    delete: (id) => apiClient.delete(`/products/${id}`),
    getLowStock: () => apiClient.get('/products/low-stock'),
};

export default apiClient;
