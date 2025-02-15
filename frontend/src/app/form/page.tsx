"use client";
import React, { FormEvent, useState } from "react";
import { generateTemplate } from "@/api/template";
import Form from "@/components/Form";
import Loading from "@/components/loading";
import { FormDataRequest, ResponseTemplate } from "@/types";
import Task from "@/components/Task";

export default function App() {
    const [loading, setLoading] = useState(false);
    const [responseData, setResponseData] = useState<ResponseTemplate | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    return (
        <div className="flex items-center h-screen w-screen">
            <div className="flex rounded w-5/12 justify-center">
                {loading ?
                    <Loading />
                    :
                    <Form setLoading={setLoading} setResponseData={setResponseData} isSubmitted={isSubmitted} responseData={responseData} setIsSubmitted={setIsSubmitted} />
                }
            </div>
            

            <div className="w-full h-screen flex bg-slate-200 p-8">
                <div className="w-full h-full self-center flex flex-col justify-center gap-4">
                    <div className="w-3/5 h-full mx-auto flex justify-center bg-white p-4 overflow-y-auto overflow-x-hidden">
                    {loading ?
                        <Loading />
                        :
                        <Task data={responseData}/>
                    }
                    </div>
                </div>
            </div>
        </div>
    );
}

