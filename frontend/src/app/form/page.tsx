"use client";
import React, { FormEvent, useState } from "react";
import background from "../../assets/img/background.jpg"
import { generateTemplate } from "@/api/template";
import { useRouter } from "next/navigation";
import Form from "@/components/Template";
import Loading from "@/components/loading";
import { FormDataRequest, ResponseTemplate } from "@/types";
import Task from "@/components/Task";

const backgroundStyle = {
    backgroundImage: `url(${background.src})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    height: '100vh',
};

export default function App() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [responseData, setResponseData] = useState<ResponseTemplate | null>(null);
    const [formData, setFormData] = useState<FormDataRequest>();

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));
        
        const formDataRequest: FormDataRequest = {
            ano: data["ano"] as string,
            assunto: data["assunto"] as string,
            tematica: data["tematica"] as string,
          };
        
          setFormData(formDataRequest);
        setLoading(true)
        
        try{
            const response = await generateTemplate(formDataRequest)
            if (response.status === 201){
                console.log(response.data)
                setResponseData(response.data)
            } 
        }catch(error: any){
            console.log(error)
        }
        finally{
            setLoading(false) 
        }
    };

    return (
        <div style={backgroundStyle} className="flex justify-center items-center">
        { loading ? 
            <Loading/>
        :
            !responseData ? 
                <Form onSubmit={onSubmit}/>
            :
                <Task data={responseData} formData={formData}/>
        }
        </div>
    );
}

