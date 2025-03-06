import { api } from "./api";

export async function getImageById(id: string) {
  return await api.get(`/image/${id}`)
}