import { api } from "./api";
import { toast } from "react-toastify";

export const generateTemplate = async (data: any) => {
    try{
        return await api.post('/template', data) 
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