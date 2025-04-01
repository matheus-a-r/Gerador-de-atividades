import { api } from "@/api/api";
import { getFilters } from "@/api/template";
import { Task } from "@/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface Props {
    tasks: Task[];
    setTasks: Dispatch<SetStateAction<Task[]>>;
}

export default function Filters(props: Props) {
    const { tasks, setTasks } = props;

    const [themes, setThemes] = useState<Set<string>>(new Set());
    const [subjects, setSubjects] = useState<Set<string>>(new Set());
    const [levels, setLevels] = useState<Set<string>>(new Set());
    const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: Set<string> }>({
        subject: new Set(),
        theme: new Set(),
        level: new Set()
    });

    useEffect(() => {
        montaFiltros()
    }, []);

    useEffect(() => {
        fetchTasks();
    }, [selectedFilters]);

    const montaFiltros = async () => {
        const response = await getFilters();

        if(response && response.status == 200){
            setThemes(response.data.themes)
            setSubjects(response.data.subjects)
            setLevels(response.data.levels)
        }
    }

    const fetchTasks = async () => {
        const filters = {
            subject: Array.from(selectedFilters.subject),
            theme: Array.from(selectedFilters.theme),
            level: Array.from(selectedFilters.level)
        };
    
        const queryParams = new URLSearchParams();
        Object.entries(filters).forEach(([key, values]) => {
            if (values.length > 0) { 
                values.forEach((value) => queryParams.append(key, value));
            }
        });
    
        const url = `/template?${queryParams.toString()}`;
        
        try {
            const response = await api.get(url);
            if (response.status === 200) {
                setTasks(response.data.items);
            }
        } catch (error) {
            console.error("Erro ao buscar tasks:", error);
        }
    };

    const handleCheckboxChange = (group: string, value: string) => {
        setSelectedFilters((prev) => {
            const newSet = new Set(prev[group]);
            if (newSet.has(value)) {
                newSet.delete(value);
            } else {
                newSet.add(value);
            }
            return { ...prev, [group]: newSet };
        });
    };

    const renderCheckbox = (value: string, group: string) => (
        <div key={value} className="flex items-center">
            <input
                id={`${group}-${value}`}
                type="checkbox"
                value={value}
                checked={selectedFilters[group].has(value)}
                onChange={() => handleCheckboxChange(group, value)}
                className="w-5 h-5 appearance-none border border-gray-300 rounded-md mr-2 hover:border-indigo-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100 checked:bg-[url('https://pagedone.io/asset/uploads/1689406942.svg')]"
            />
            <label
                htmlFor={`${group}-${value}`}
                className="text-xs font-normal text-gray-600 leading-4 cursor-pointer"
            >
                {value}
            </label>
        </div>
    );

    return (
        <section className="w-64">
            <div className="w-full mx-auto">
                <div className="col-span-12 md:col-span-3 w-full max-md:max-w-md max-md:mx-auto">
                    <div className="box rounded-xl border border-gray-300 bg-white p-6 w-full md:max-w-sm">
                        <div className="flex items-center justify-between w-full pb-3 border-b border-gray-200 mb-7">
                            <p className="font-medium text-base leading-7 text-black">
                                Filter Plans
                            </p>
                            <p
                                className="font-medium text-xs text-gray-500 cursor-pointer transition-all duration-500 hover:text-indigo-600"
                                onClick={() => setSelectedFilters({ subject: new Set(), theme: new Set(), level: new Set() })}
                            >
                                RESET
                            </p>
                        </div>

                        <p className="font-medium text-sm leading-6 text-black mb-2">Subject</p>
                        <div className="box flex flex-col gap-2 mb-2">
                            {Array.from(subjects).map((subject) => renderCheckbox(subject, "subject"))}
                        </div>

                        <p className="font-medium text-sm leading-6 text-black mb-2">Theme</p>
                        <div className="box flex flex-col gap-2 mb-2">
                            {Array.from(themes).map((theme) => renderCheckbox(theme, "theme"))}
                        </div>

                        <p className="font-medium text-sm leading-6 text-black mb-2">Level</p>
                        <div className="box flex flex-col gap-2 mb-2">
                            {Array.from(levels).map((level) => renderCheckbox(level, "level"))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
