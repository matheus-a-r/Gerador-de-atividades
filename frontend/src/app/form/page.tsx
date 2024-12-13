'use client';

import React, { FormEvent } from "react";
import Template from '@/components/Transition'
import background from "../../assets/img/background.jpg"
import { generateTemplate } from "@/api/template";

const backgroundStyle = {
    backgroundImage: `url(${background.src})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    height: '100vh',
};
export default function App() {

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    const response = await generateTemplate(data)
    if(response.status === 201) console.log(true)

  };

  return (
    <div style={backgroundStyle} className="flex justify-center items-center">
        <Template>
            <div className="flex flex-col justify-center items-center gap-8">
                <span className="text-3xl font-extrabold">Informe os parâmetros</span>
                <form
                onSubmit={onSubmit}
                >
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="ano">Ano escolar</label>
                            <input
                            className="p-4 w-72"
                            name="ano"
                            placeholder="2 ano fundamental"
                            type="text"
                            required
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="assunto">Assunto</label>    
                            <input
                            className="p-4 w-72"
                            name="assunto"
                            placeholder="Adição e Lógica"
                            type="text"
                            required
                            />
                        </div>

                        <div className="flex flex-col">    
                            <label htmlFor="tematica">Temática</label>
                            <input
                            className="p-4 w-72"
                            name="tematica"
                            placeholder="Frutas"
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
    </div>
  );
}

