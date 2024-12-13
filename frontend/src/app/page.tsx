'use client'
import background from "../assets/img/background.jpg"
import { useRouter } from 'next/navigation'

const backgroundStyle = {
  backgroundImage: `url(${background.src})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  height: '100vh',
};

export default function Home() {
  const router = useRouter();
  
  return (
    <div style={backgroundStyle} className="flex justify-center items-center">
      <div className="w-[75%] h-1/2 flex flex-col justify-center items-center gap-4 lg:gap-8">
        <span className="text-5xl font-bold">Gerador de atividades escolares</span>
        <div className="flex flex-col gap-2 justify-center items-center">
          <span className="text-2xl font-bold">Crie atividades escolares com o poder da Inteligência Artificial!</span>
          <span>Personalize cada atividade escolhendo o tema, objetivos de aprendizagem, série escolar do aluno e a tarefa específica que o aluno deve fazer</span>
        </div>
        <button onClick={() => router.push('/form')} className="w-48 h-14 px-6 text-base bg-[#87CEEB] rounded-lg font-semibold">
          Começar
        </button>
      </div>
    </div>
  );
}
