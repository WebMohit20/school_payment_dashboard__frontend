import { useContext, useEffect } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import { LogOut } from 'lucide-react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Navbar() {
    const [theme, setTheme] = useContext(ThemeContext)
    const navigate = useNavigate()
    const logout = ()=>{
        axios.delete("http://localhost:3000/api/v1/logout",{withCredentials:true})
        .then(res=>{
            console.log(res.data)
            if(res.data.success){
                navigate("/login",{replace:true})
            }
        })
        .catch(err=>console.log(err))
    }

    return (
        <div className="navbar absolute top-0 bg-base-100 shadow-md px-6">
            <div className="flex-1">
                <span className="text-xl font-bold"> Dashboard </span>
            </div>
            <div className='flex gap-6'>
                <label className="toggle text-base-content">
                    <input type="checkbox" value={theme} className="theme-controller"
                        onChange={() => setTheme(theme => theme === "light" ? "dark" : "light")} />

                    <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></g></svg>

                    <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></g></svg>

                </label>
                <button className="flex gap-2 items-center cursor-pointer" onClick={logout}>
                    <LogOut className="size-5" />
                    <span className="hidden sm:inline">Logout</span>
                </button>
            </div>
        </div>
    )
}

export default Navbar
