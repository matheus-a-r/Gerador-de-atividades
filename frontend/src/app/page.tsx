'use client'
import { useContext } from "react";
import background from "../assets/img/background.jpg"
import { useRouter } from 'next/navigation'
import { AuthContext } from "@/context/AuthContext";

const backgroundStyle = {
  backgroundImage: `url(${background.src})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  height: '100vh',
};

export default function Home() {
  const router = useRouter();

  const { isAuthenticated } = useContext(AuthContext);

  const handleStartClick = () => {
    if (isAuthenticated) {
      router.push("/form");
    } else {
      router.push("/login");
    }
  }
  
  return (
    <div style={backgroundStyle} className="flex justify-center items-center">
      <div className="w-[75%] h-1/2 flex flex-col justify-center items-center gap-4 lg:gap-8">
        <span className="text-5xl font-bold">School Activity Generator</span>
        <div className="flex flex-col gap-2 justify-center items-center">
          <span className="text-2xl font-bold">Create school activities with the power of Artificial Intelligence!</span>
          <span>Customize each activity by selecting the topic, learning objectives and the student's grade level.</span>
        </div>
        <div className="flex gap-4">
          <button onClick={handleStartClick} className="w-48 h-14 px-6 text-base bg-[#87CEEB] rounded-lg font-semibold">
            Start
          </button>
          <button className="self-center w-48 h-14 px-6 text-base bg-[#87CEEB] rounded-lg font-semibold" type="submit">
            View generated activities
          </button>
        </div>
      </div>
    </div>
  );
}
