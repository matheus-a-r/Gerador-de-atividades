"use client";
import React, { useEffect, useState } from "react";
import Form from "@/components/Form";
import Loading from "@/components/loading";
import { ResponseTemplate } from "@/types";
import Invoice from "@/components/invoice";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { generateImage } from "@/api/template";

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
                    {responseData &&
                    <button onClick={handleDownloadPdf} className="font-[Poppins] self-center bg-[#219EBC] w-32 h-10 px-4 text-sm rounded-lg font-semibold text-white">
                        Baixar PDF
                    </button>
                    }
                    <div className="w-[720px] self-center h-full flex justify-center bg-white p-4 overflow-y-auto overflow-x-hidden text-wrap">
                    {loading ?
                        <Loading />
                        :
                        <Invoice ref={printRef} data={responseData}/>
                    }
                    </div>
                </div>
            </div>
        </div>
    );
}

