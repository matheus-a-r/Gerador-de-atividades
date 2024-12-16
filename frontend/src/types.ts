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
}