// src/services/productApi.js
import api from '@/utils/api'

export const getProductsApi = () => api.get('/products')
export const getProductBySlugApi = (slug) => api.get(`/products/${slug}`)
export const getAllProductsApi = () => api.get('/admin/products')
export const createProductApi = (data) => api.post('/products', data)
export const updateProductApi = (id, data) => api.put(`/products/${id}`, data)
export const deleteProductApi = (id) => api.delete(`/products/${id}`)