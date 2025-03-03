import { api } from "./api"

export const generateTemplate = async (data: any) => {
    const response = await api.post('/template', data)
    
    return response
}

export const generateImage = async (data: any) => {
    const response = await api.post('/template/image', data)
    
    return response
}