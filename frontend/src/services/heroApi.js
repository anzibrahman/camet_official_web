// services/heroApi.js

import api from "@/utils/api"


export const getHeroBannerApi = () => api.get('/hero-banner')

export const saveHeroBannerApi = (formData) =>
  api.post('/hero-banner', formData)