import { api } from "./api";
import { toast } from "react-toastify";

export async function getImageById(id: string) {
  try{
    return await api.get(`/image/${id}`)
  }catch(error: any){
    toast.error(error.message);
  }
}

export async function updateImageById(id: string, formData: FormData){
  try{
    return await api.put(`/image/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }catch(error: any){
    toast.error(error.message);
  }
}