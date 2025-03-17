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
        layout: ""
    });

    const regen = async () => {
        
        const formDataRequest: FormDataRequest = {
            ano: responseData?.params.ano,
            assunto: responseData?.params.assunto,
            tematica: responseData?.params.tematica,
            layout: responseData?.params.layout,
        };

        setLoading(true)

        try {
            // const response = await generateTemplate(formDataRequest)
            // if (response.status === 201) {
                const mock = {
                    "params": {
                        "task": "The objective of this activity is for the student to calculate the total number of fruits Sam has by adding the given values together.",
                        "layout": "One image",
                        "answer": "To correctly answer this activity, the student will add the number of bananas and apples (35 + 27 = 62). The student should write the total (62) in the answer box.",
                        "ano": "2nd year elementary scholl",
                        "assunto": "addition and logic",
                        "tematica": "Fruits"
                    },
                    "html": "<html><head></head><body><div style=\"width: 800px; border: solid 1px; padding: 10px; text-align: center;\" exp=\"This div acts as the main container for the activity. It sets a fixed width of 800px with padding for spacing inside and centers the content.\">\n      <div class=\"activity\" style=\"width: 100%;\">\n        <p exp=\"This paragraph provides a clear description of the task. The student needs to calculate the total number of fruits based on the given numbers.\">\n          Sam collected 35 bananas and 27 apples. How many fruits does he have in total?\n        </p>\n\n        <div style=\"display: flex; justify-content: center; margin-bottom: 20px;\" exp=\"This section contains an illustration related to the problem to make the activity more engaging for the student.\">\n          <img src=\"67d0d26909f176633a7f8cb9\" alt=\"Illustration of Sam holding a bunch of 35 bananas and a basket with 27 apples.\" style=\"width: 300px; height: auto;\" exp=\"This image visually represents the scenario where Sam has collected both bananas and apples, prompting the student to add them together.\">\n        </div>\n\n        <p>Write the total number of fruits in the box below:</p>\n        <div style=\"width: 100px; height: 100px; border: 1px solid black; margin: 10px auto;\" exp=\"This box is centered and used for the student to write the total number of fruits. The correct answer is 62.\">\n        </div>\n      </div>\n    </div></body></html>"
                }
                setResponseData(mock)
                setLoading(false)
            // }
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
            layout: values.layout
        };
        
        setLoading(true)
        
        try {
            // const response = await generateTemplate(formDataRequest)
            // if (response.status === 201) {
                const mock = {
                    "params": {
                        "task": "The objective of this activity is for the student to calculate the total number of fruits Sam has by adding the given values together.",
                        "layout": "One image",
                        "answer": "To correctly answer this activity, the student will add the number of bananas and apples (35 + 27 = 62). The student should write the total (62) in the answer box.",
                        "ano": "2nd year elementary scholl",
                        "assunto": "addition and logic",
                        "tematica": "Fruits"
                    },
                    "html": "<html><head></head><body><div style=\"width: 800px; border: solid 1px; padding: 10px; text-align: center;\" exp=\"This div acts as the main container for the activity. It sets a fixed width of 800px with padding for spacing inside and centers the content.\">\n      <div class=\"activity\" style=\"width: 100%;\">\n        <p exp=\"This paragraph provides a clear description of the task. The student needs to calculate the total number of fruits based on the given numbers.\">\n          Sam collected 35 bananas and 27 apples. How many fruits does he have in total?\n        </p>\n\n        <div style=\"display: flex; justify-content: center; margin-bottom: 20px;\" exp=\"This section contains an illustration related to the problem to make the activity more engaging for the student.\">\n          <img src=\"67d0d26909f176633a7f8cb9\" alt=\"Illustration of Sam holding a bunch of 35 bananas and a basket with 27 apples.\" style=\"width: 300px; height: auto;\" exp=\"This image visually represents the scenario where Sam has collected both bananas and apples, prompting the student to add them together.\">\n        </div>\n\n        <p>Write the total number of fruits in the box below:</p>\n        <div style=\"width: 100px; height: 100px; border: 1px solid black; margin: 10px auto;\" exp=\"This box is centered and used for the student to write the total number of fruits. The correct answer is 62.\">\n        </div>\n      </div>\n    </div></body></html>"
                }
                setResponseData(mock)
            // }
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

                                    <div className="flex flex-col">
                                        <label htmlFor="tematica">Layout</label>
                                        <input
                                            className="p-4 w-72 bg-gray-100 rounded-lg"
                                            name="layout"
                                            placeholder="Two images"
                                            type="text"
                                            required
                                            value={values.layout} 
                                            onChange={getHandler('layout')}
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