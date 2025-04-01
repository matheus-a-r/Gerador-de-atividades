import { FormEvent, useState } from "react";
import Template from "../Transition";
import Image from "next/image";
import Refresh from "../../assets/img/refresh-cw.svg";
import { div } from "framer-motion/client";
import { FormDataRequest } from "@/types";
import { generateTemplate } from "@/api/template";
import Loading from "../loading";

type Props = {
    setIsSubmitted: any
    isSubmitted: boolean;
    responseData: any
    setLoading: any
    setResponseData: any
    loading: boolean
}

export default function Form(props: Props) {
    const { loading, isSubmitted, responseData, setIsSubmitted, setLoading, setResponseData } = props;

    const [values, setValues] = useState({
        ano: "",
        assunto: "",
        tematica: "",
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
            const response = await generateTemplate(formDataRequest)
            if (response && response.status === 201) {
                const mock = {
                    "params": {
                        "task": "The objective of this activity is for the student to calculate the total number of fruits Sam has by adding the given values together.",
                        "layout": "One image",
                        "answer": "To correctly answer this activity, the student will add the number of bananas and apples (35 + 27 = 62). The student should write the total (62) in the answer box.",
                        "ano": "2nd year elementary scholl",
                        "assunto": "addition and logic",
                        "tematica": "Fruits"
                    },
                    "html": `<html><head></head><body><div class="container" exp="This div acts as the main container for the activity. It sets a fixed width of 800px with padding for spacing inside.">
      <div class="activity">
        <p exp="This paragraph provides a clear description of the task. The student needs to divide the total number of puppies among the child's friends and express the result as a whole number.">
          A child is taking care of 9 puppies. She wants to give all the puppies to her friends. Solve the division problems below and write the number of puppies each friend will receive as a whole number.
        </p>

        <div class="image" exp="This section contains an image related to the problem context.">
          <img src="67d845debd40807a295a5c3f" alt="Illustration of a child with 9 puppies, representing a division problem." style="width: 400px; height: auto;" exp="This image visually represents the scenario described in the problem, helping students contextualize the activity.">
        </div>

        <div class="question" exp="This section contains the first question about dividing the puppies among 4 friends.">
          <p> A child with 9 puppies wants to give them all to 4 friends. How many puppies will each friend receive? Write the result as a whole number.</p>
          <p style="border: 1px solid black; padding: 5px;" exp="Box where the student writes the answer. The correct answer is '2 puppies for each friend.'"></p>
        </div>

        <div class="question" exp="This section contains the second question about dividing the puppies among 3 friends.">
          <p>Now, instead of 4 friends, the child decides to give the 9 puppies to 3 friends. How many puppies will each friend receive? Write the result as a whole number.</p>
          <p style="border: 1px solid black; padding: 5px;" exp="Box where the student writes the answer. The correct answer is '3 puppies for each friend.'"></p>
        </div>
      </div>
    </div></body></html>`
                }
                setResponseData(response.data)
                setLoading(false)
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
            layout: values.layout
        };

        setLoading(true)

        try {
            const response = await generateTemplate(formDataRequest)
            if (response && response.status === 201) {
                const mock = {
                    "params": {
                        "task": "The objective of this activity is for the student to calculate the total number of fruits Sam has by adding the given values together.",
                        "layout": "One image",
                        "answer": "To correctly answer this activity, the student will add the number of bananas and apples (35 + 27 = 62). The student should write the total (62) in the answer box.",
                        "ano": "2nd year elementary scholl",
                        "assunto": "addition and logic",
                        "tematica": "Fruits"
                    },
                    "html": `<html><head></head><body><div class="container" exp="This div acts as the main container for the activity. It sets a fixed width of 800px with padding for spacing inside.">
      <div class="activity">
        <p exp="This paragraph provides a clear description of the task. The student needs to divide the total number of puppies among the child's friends and express the result as a whole number.">
          A child is taking care of 9 puppies. She wants to give all the puppies to her friends. Solve the division problems below and write the number of puppies each friend will receive as a whole number.
        </p>

        <div class="image" exp="This section contains an image related to the problem context.">
          <img src="67d845debd40807a295a5c3f" alt="Illustration of a child with 9 puppies, representing a division problem." style="width: 400px; height: auto;" exp="This image visually represents the scenario described in the problem, helping students contextualize the activity.">
        </div>

        <div class="question" exp="This section contains the first question about dividing the puppies among 4 friends.">
          <p> A child with 9 puppies wants to give them all to 4 friends. How many puppies will each friend receive? Write the result as a whole number.</p>
          <p style="border: 1px solid black; padding: 5px;" exp="Box where the student writes the answer. The correct answer is '2 puppies for each friend.'"></p>
        </div>

        <div class="question" exp="This section contains the second question about dividing the puppies among 3 friends.">
          <p>Now, instead of 4 friends, the child decides to give the 9 puppies to 3 friends. How many puppies will each friend receive? Write the result as a whole number.</p>
          <p style="border: 1px solid black; padding: 5px;" exp="Box where the student writes the answer. The correct answer is '3 puppies for each friend.'"></p>
        </div>
      </div>
    </div></body></html>`
                }
                setResponseData(response.data);
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
                        <span className="text-3xl font-extrabold text-black">Enter the parameters</span>
                        :
                        <span className="text-3xl font-extrabold text-black">Task summary</span>
                    }
                    <form
                        onSubmit={onSubmit}
                    >
                        <div className="flex flex-col gap-8">
                            {!isSubmitted ? (
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col">
                                        <label htmlFor="ano" className="text-black">Grade level</label>
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
                                        <label htmlFor="assunto" className="text-black">Subject</label>
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
                                        <label htmlFor="tematica" className="text-black">Theme</label>
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
                                        <label htmlFor="tematica" className="text-black">Layout</label>
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
                                loading ?
                                    <div className="self-center">
                                        <Loading />
                                    </div>
                                    :
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