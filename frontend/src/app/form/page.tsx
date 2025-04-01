"use client";
import React, { FormEvent, useState } from "react";
import { generateTemplate } from "@/api/template";
import Form from "@/components/Form";
import Loading from "@/components/loading";
import { FormDataRequest, ResponseTemplate } from "@/types";
import Task from "@/components/Task";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Header } from "@/components/Header";

export default function App() {
    const [loading, setLoading] = useState(false);
    const [responseData, setResponseData] = useState<ResponseTemplate | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const printRef = React.useRef(null);

    const handleDownloadPdf = async () => {
        const element = printRef.current;
        if (!element) {
            return;
    }

    const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,       
        allowTaint: true,    
        logging: true, 
    });
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
    });

    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();

    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("examplepdf.pdf");
    };


    return (
        <div className="flex flex-col items-center h-screen w-screen">
            <Header/>
            <div className="flex items-center h-full w-screen">
                <div className="flex rounded w-5/12 justify-center items-center bg-white h-full">
                    <Form setLoading={setLoading} loading={loading} setResponseData={setResponseData} isSubmitted={isSubmitted} responseData={responseData} setIsSubmitted={setIsSubmitted} /> 
                </div>
                
                <div className="w-full h-screen flex bg-slate-200 p-12 pb-0">
                    <div className="w-full h-full self-center flex flex-col justify-center gap-4">
                        {responseData &&
                        <button onClick={handleDownloadPdf} className="font-[Poppins] self-center bg-[#219EBC] w-32 h-10 px-4 text-sm rounded-lg font-semibold text-white">
                            Baixar PDF
                        </button>
                        }
                        <div className="w-[720px] self-center h-[870px] flex justify-center bg-white p-4 overflow-y-auto overflow-x-hidden text-wrap">
                        {loading ?
                            <Loading />
                            :
                            <Task ref={printRef} data={responseData}/>
                        }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

