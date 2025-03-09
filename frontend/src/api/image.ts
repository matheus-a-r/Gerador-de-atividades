import { api } from "./api";

export async function getImageById(id: string) {
  return await api.get(`/image/${id}`)
}

export async function updateImageById(id: string, formData: FormData){
  return await api.put(`/image/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}