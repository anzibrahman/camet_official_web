const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const uploadPreset = import.meta.env.VITE_CLOUDINARY_PRESET

export const uploadMediaToCloudinary = async (file) => {
  const resourceType = file.type.startsWith('video/') ? 'video' : 'image'
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', uploadPreset)

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
    {
      method: 'POST',
      body: formData,
    }
  )

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data?.error?.message || 'Cloudinary upload failed')
  }

  return {
    url: data.secure_url,
    publicId: data.public_id,
    assetId: data.asset_id,
    resourceType,
  }
}

const uploadImageToCloudinary = async (file) => {
  const uploaded = await uploadMediaToCloudinary(file)
  return { ...uploaded, imageUrl: uploaded.url }
}

export default uploadImageToCloudinary
