'use client'
 
import { usePathname } from 'next/navigation'
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { toast } from "react-toastify";
import { useLocation } from 'react-router-dom';

export function Header(){
    
    const { logout } = useContext(AuthContext);

    const pathname = usePathname()

    const handleLogout = async () => {
        try {
          await logout();
        } catch (err:any) {
            toast.error(err.response.data.message)
        }
      };
    
    return (
        <header className="fixed top-0 w-full z-50">
            <nav className="bg-white border-gray-200 px-4 lg:px-6 p-2 dark:bg-gray-800">
                <div className="flex justify-between items-center max-w-[1450px] mx-auto">
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">TaskAI</span>
                    <div className="flex items-center space-x-2">
                        {
                            pathname === '/form' ?
                            <a href="#" className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                                View Tasks Generated
                            </a>
                            :
                            <a href="#" className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                                Generate Task
                            </a>
                        }
                        <button onClick={handleLogout} className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                            Logout
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    )
}