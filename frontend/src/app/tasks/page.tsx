"use client"

import { getTasks } from "@/api/template"
import Filters from "@/components/filters";
import { Header } from "@/components/Header";
import ViewTask from "@/components/ViewTask";
import { Task } from "@/types";
import { useEffect, useState } from "react"

export default function Tasks(){
    const [tasks, setTasks] = useState<Task[]>([]);
    
    useEffect(() => {
        loadTasks();
    },[])

    const loadTasks = async () => {
        
        const response = await getTasks();

        if(response && response.status == 200){
            setTasks(response.data.items)
        }
        
    }

    return(
        <div className="w-full h-full bg-stone-100 flex justify-center pb-4">
            <Header />
            <div className="w-full flex flex-col max-w-[1450px] gap-4">
                    <div className="mt-20 self-start">
                        <p className="text-5xl text-black">All Generated Activities</p>
                    </div>
                    <div className="border-t border-gray-400 my-4"></div>
                    <div>
                        <div className="text-black">
                            Filters
                        </div>
                        <div className="flex justify-between mt-7">
                            <Filters tasks={tasks} setTasks={setTasks}/>
                            <div className="w-full grid place-items-center max-w-[1150px]">
                                <div className="w-full grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                                    {tasks.map((task, index) => (
                                        <ViewTask key={index} task={task}/>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
        </div>
    )
}