const API_BASE_URL = 'http://localhost:5000/api';

// 토큰 관리
export const getToken = () => localStorage.getItem('token');
export const setToken = (token: string) => localStorage.setItem('token', token);
export const removeToken = () => localStorage.removeItem('token');

// API 요청 헬퍼
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = getToken();
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'API 요청 실패');
  }
  
  return response.json();
};

// 인증 API
export const authAPI = {
  register: (userData: { name: string; email: string; password: string; type?: string }) =>
    apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
  
  login: (credentials: { email: string; password: string }) =>
    apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
  
  getProfile: () => apiRequest('/auth/profile'),
};

// 아티스트 API
export const artistAPI = {
  getAll: (params?: { category?: string; subcategory?: string; page?: number; limit?: number }) => {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.append('category', params.category);
    if (params?.subcategory) searchParams.append('subcategory', params.subcategory);
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    
    const queryString = searchParams.toString();
    return apiRequest(`/artists${queryString ? `?${queryString}` : ''}`);
  },
  
  getById: (id: string) => apiRequest(`/artists/${id}`),
  
  create: (artistData: FormData) =>
    apiRequest('/artists', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      body: artistData,
    }),
  
  update: (id: string, artistData: FormData) =>
    apiRequest(`/artists/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      body: artistData,
    }),
  
  follow: (id: string) =>
    apiRequest(`/artists/${id}/follow`, {
      method: 'POST',
    }),
};

// 후원 API
export const donationAPI = {
  create: (donationData: { artistId: string; amount: number; type: string; goodId?: string }) =>
    apiRequest('/donations', {
      method: 'POST',
      body: JSON.stringify(donationData),
    }),
  
  getUserDonations: (params?: { page?: number; limit?: number }) => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    
    const queryString = searchParams.toString();
    return apiRequest(`/donations/user${queryString ? `?${queryString}` : ''}`);
  },
  
  getArtistDonations: (artistId: string, params?: { page?: number; limit?: number }) => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    
    const queryString = searchParams.toString();
    return apiRequest(`/donations/artist/${artistId}${queryString ? `?${queryString}` : ''}`);
  },
};

// 댓글 API
export const commentAPI = {
  create: (commentData: { artistId: string; content: string; type?: string }) =>
    apiRequest('/comments', {
      method: 'POST',
      body: JSON.stringify(commentData),
    }),
  
  getByArtist: (artistId: string, params?: { page?: number; limit?: number }) => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    
    const queryString = searchParams.toString();
    return apiRequest(`/comments/artist/${artistId}${queryString ? `?${queryString}` : ''}`);
  },
  
  update: (id: string, content: string) =>
    apiRequest(`/comments/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ content }),
    }),
  
  delete: (id: string) =>
    apiRequest(`/comments/${id}`, {
      method: 'DELETE',
    }),
};

