import { FormDataRequest, ResponseTemplate } from "@/types";
import Template from "../Transition";
import Image from "next/image";
import Refresh from "../../assets/img/refresh-cw.svg";

type Props = {
    data: ResponseTemplate
    formData: FormDataRequest | undefined
}

export default function Task(props: Props) {
    const { data, formData } = props;
    console.log(formData)
    return (
        <div className="flex justify-center items-center max-w-6xl">
            <Template>
                <div>
                    <h1 className="text-3xl font-semibold text-center text-gray-800 mb-4">Generated Activity</h1>
                    <p className="text-center text-gray-600 mb-6">Here is the activity generated based on your parameters choices.</p>
                </div>
                <div className="flex flex-col gap-8">
                    <div className="flex gap-4 flex-col">
                        <div className="flex gap-2">
                            <span className="font-bold text-gray-800">Grade Level:</span>
                            <span className="text-gray-700">{formData?.ano}</span>
                        </div>
                        <div className="flex gap-2">
                            <span className="font-bold text-gray-800">Topic:</span>
                            <span className="text-gray-700">{formData?.tematica}</span>
                        </div>
                        <div className="flex gap-2">
                            <span className="font-bold text-gray-800">Subject:</span>
                            <span className="text-gray-700">{formData?.assunto}</span>
                        </div>
                        <div className="flex gap-2">
                            <span className="font-bold text-gray-800">Task:</span>
                            <span className="text-gray-700">{data.params.task}</span>
                        </div>
                        <div className="flex gap-2">
                            <span className="font-bold text-gray-800">Answer:</span>
                            <span className="text-gray-700">{data.params.answer}</span>
                        </div>
                    </div>
                    <div className="self-center" dangerouslySetInnerHTML={{ __html: data.html }} />
                    <button className="self-center w-48 h-14 px-6 text-base bg-[#87CEEB] rounded-lg font-semibold flex justify-center items-center gap-2" type="submit">
                        <Image src={Refresh} alt="regen"/>
                        Regen
                    </button>
                </div>
            </Template>
        </div>
    )
}