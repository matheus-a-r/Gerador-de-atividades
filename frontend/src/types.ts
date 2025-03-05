type jsonParams = {
    answer:string;
    task: string;
    layout: string
  }
  
export type ResponseTemplate = {
  html: string;
  style: string;
  params: jsonParams
}

export type FormDataRequest = {
  ano: string;
  assunto: string;
  tematica: string;
  layout: string
}

export interface ChangePassword {
  email: string;
  newPassword: string;
  confirmPassword: string;
}

export type UserFormState = {
  name: string,
  email: string,
  phone: string,
  password: string
}

export type SignInRequestData = {
  email: string;
  password: string
}

export type UserResponseDTO = {
  nome: string;
  email: string;
  password: string;
  phone: string
}