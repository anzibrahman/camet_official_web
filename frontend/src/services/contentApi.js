import api from '@/utils/api'

export const getAdminContent = (type) => api.get(`/admin/${type}`)
export const createContent = (type, data) => api.post(`/${type}`, data)
export const updateContent = (type, id, data) => api.put(`/${type}/${id}`, data)
export const deleteContent = (type, id) => api.delete(`/${type}/${id}`)

export const uploadMedia = (file) => {
  const formData = new FormData()
  formData.append('files', file)
  return api.post('/media', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
}
