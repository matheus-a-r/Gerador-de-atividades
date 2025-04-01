import { deslikeTask, likeTask } from "@/api/template";
import { Task } from "@/types";
import { ThumbsUp, ThumbsDown, ArrowBigUp, ArrowBigDown } from "lucide-react";
import { useState } from "react";

interface Props{
    task: Task
}

export default function ViewTask(props: Props){
    
    const { task } = props;

    const [likes, setLikes] = useState(task.likes);
    const [dislikes, setDislikes] = useState(task.dislikes);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

    const handleLike = async() => {
        const response = await likeTask(task._id);
        console.log(response)
        if(response && response.status == 200){
            setLikes(response.data.likes)
        }
    }

    const handleDeslike = async() => {
        const response = await deslikeTask(task._id);
        console.log(response)
        if(response && response.status == 200){
            setDislikes(response.data.dislikes)
        }
    }

    console.log(likes)

    return(
        <div className="relative w-full h-60 flex flex-col bg-slate-200 rounded p-4 shadow-md border border-bluelight gap-6">
            <div className="flex flex-col gap-2 text-gray-700">
                <h2 className="text-xl font-bold text-gray-700">Level: {task.level}</h2>
                <p className="text-gray-700">Subject: {task.subject}</p>
                <span>
                    Theme: {task.theme}
                </span>
            </div>

            <div className="self-center bg-bluelight rounded p-2">
                <button>View details</button>
            </div>

            <div className="absolute flex space-x-2 top-48 left-60">
                <div className="flex items-center space-x-1">
                    <ArrowBigUp onClick={handleLike} size={32} className="text-green-500 cursor-pointer" />
                    <span className="text-black text-lg font-semibold mt-2 ">{likes}</span>
                </div>
                <div className="flex items-center space-x-1">
                    <ArrowBigDown onClick={handleDeslike} size={32} className="text-red-500 cursor-pointer" />
                    <span className="text-black text-lg font-semibold mt-2">{dislikes}</span>
                </div>
            </div>
            
        </div>
    )    
}