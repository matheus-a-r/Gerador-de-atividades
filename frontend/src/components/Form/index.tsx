import { FormEvent, useState } from "react";
import Template from "../Transition";
import Image from "next/image";
import Refresh from "../../assets/img/refresh-cw.svg";
import { div } from "framer-motion/client";
import { FormDataRequest } from "@/types";
import { generateTemplate } from "@/api/template";

type Props = {
    setIsSubmitted: any
    isSubmitted: boolean;
    responseData: any
    setLoading: any
    setResponseData: any
}

export default function Form(props: Props) {
    const { isSubmitted, responseData, setIsSubmitted, setLoading, setResponseData} = props;

    const [values, setValues] = useState({
        ano: "",
        assunto: "",
        tematica:  "",
    });

    const regen = async () => {
        
        const formDataRequest: FormDataRequest = {
            ano: responseData?.params.ano,
            assunto: responseData?.params.assunto,
            tematica: responseData?.params.tematica,
        };

        setLoading(true)

        try {
            const response = await generateTemplate(formDataRequest)
            if (response.status === 201) {
                setResponseData(response.data)
            }
        } catch (error: any) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }
    
    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const formDataRequest: FormDataRequest = {
            ano: values.ano,
            assunto: values.assunto,
            tematica: values.tematica,
        };
        
        setLoading(true)
        
        try {
            const response = await generateTemplate(formDataRequest)
            if (response.status === 201) {
                setResponseData(response.data)
            }
            setIsSubmitted(true);
        } catch (error: any) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    };

    const getHandler = (name: string) => {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
          setValues({ ...values, [name]: event.target.value });
        };
      };

    return (
        <Template>
            <div className="">
                <div className="flex flex-col justify-center items-center gap-8">
                    {!isSubmitted ?
                    <span className="text-3xl font-extrabold">Enter the parameters</span>
                    :
                    <span className="text-3xl font-extrabold">Task summary</span>
                    }
                    <form
                        onSubmit={onSubmit}
                    >
                        <div className="flex flex-col gap-8">
                            {!isSubmitted ? (
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col">
                                        <label htmlFor="ano">Grade level</label>
                                        <input
                                            className="p-4 w-72 bg-gray-100 rounded-lg"
                                            name="ano"
                                            placeholder="2nd year elementary school"
                                            type="text"
                                            required
                                            value={values.ano} 
                                            onChange={getHandler('ano')}
                                        />
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor="assunto">Subject</label>
                                        <input
                                            className="p-4 w-72 bg-gray-100 rounded-lg"
                                            name="assunto"
                                            placeholder="Addition and Logic"
                                            type="text"
                                            required
                                            value={values.assunto} 
                                            onChange={getHandler('assunto')}
                                        />
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor="tematica">Theme</label>
                                        <input
                                            className="p-4 w-72 bg-gray-100 rounded-lg"
                                            name="tematica"
                                            placeholder="Fruits"
                                            type="text"
                                            required
                                            value={values.tematica} 
                                            onChange={getHandler('tematica')}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="flex gap-8 flex-col justify-center items-start p-4">
                                    <div className="flex gap-2">
                                        <span className="font-bold text-gray-800">Grade Level:</span>
                                        <span className="text-gray-700">{responseData?.params.ano}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="font-bold text-gray-800">Subject:</span>
                                        <span className="text-gray-700">{responseData?.params.assunto}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="font-bold text-gray-800">Topic:</span>
                                        <span className="text-gray-700">{responseData?.params.tematica}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="font-bold text-gray-800">Task:</span>
                                        <span className="text-gray-700">{responseData?.params.task}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="font-bold text-gray-800">Answer:</span>
                                        <span className="text-gray-700">{responseData?.params.answer}</span>
                                    </div>
                                </div>
                            )}
                            {
                                !isSubmitted ?
                                    <button className="self-center w-48 h-14 px-6 text-base bg-[#87CEEB] rounded-lg font-semibold" type="submit">
                                        Submit
                                    </button>
                                    :
                                    <div className="flex gap-4 self-center">
                                        <button className="self-center w-48 h-14 px-6 text-base bg-[#87CEEB] rounded-lg font-semibold flex justify-center items-center gap-2" 
                                            onClick={() => regen()}>
                                            <Image src={Refresh} alt="regen" />
                                            Regen
                                        </button>
                                        <button className="self-center w-48 h-14 px-6 text-base bg-[#87CEEB] rounded-lg font-semibold flex justify-center items-center gap-2" 
                                                onClick={() => setIsSubmitted(false)}>
                                            Change Params
                                        </button>
                                    </div>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </Template>
    )
}