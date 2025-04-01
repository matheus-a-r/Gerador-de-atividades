import { api } from "./api";
import { toast } from "react-toastify";

export const generateTemplate = async (data: any) => {
    try{
        return await api.post('/template', data) 
    }catch(error: any){
        toast.error(error.message);
    }
}

export const getTasks = async () => {
    try{
        return await api.get('/template');
    }catch(error: any){
        toast.error(error.message);
    }
}

export const generateImage = async (data: any) => {
    try{
        return await api.post('/template/image', data)
    }catch(error: any){
        toast.error(error.message);
    }
}

export const getFilters = async () => {
    try{
        return await api.get('/template/filters');
    }catch(error: any){
        toast.error(error.message);
    }
}

export const likeTask = async (id: string) => {
    try{
        return await api.patch(`/template/like/${id}`);
    }catch(error: any){
        toast.error(error.message);
    }
}

export const deslikeTask = async (id: string) => {
    try{
        return await api.patch(`/template/deslike/${id}`);
    }catch(error: any){
        toast.error(error.message);
    }
}

