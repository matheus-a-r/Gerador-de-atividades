import { FormEvent } from "react";
import Template from "../Transition";

type Props = {
    onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>
}

export default function Form(props: Props) {
    const {onSubmit} = props;
    
    return (
        <Template>
            <div className="flex flex-col justify-center items-center gap-8">
                <span className="text-3xl font-extrabold">Enter the parameters</span>
                <form
                    onSubmit={onSubmit}
                >
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col">
                                <label htmlFor="ano">Grade level</label>
                                <input
                                    className="p-4 w-72"
                                    name="ano"
                                    placeholder="2nd year elementary school"
                                    type="text"
                                    required
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="assunto">Subject</label>
                                <input
                                    className="p-4 w-72"
                                    name="assunto"
                                    placeholder="Addition and Logic"
                                    type="text"
                                    required
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="tematica">Theme</label>
                                <input
                                    className="p-4 w-72"
                                    name="tematica"
                                    placeholder="Fruits"
                                    type="text"
                                    required
                                />
                            </div>
                        </div>
                        <button className="self-center w-48 h-14 px-6 text-base bg-[#87CEEB] rounded-lg font-semibold" type="submit">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </Template>
    )
}