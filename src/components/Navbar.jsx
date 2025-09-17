import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import { LogOut,LogIn } from 'lucide-react'
import axios from 'axios'
import { useNavigate,Link } from 'react-router-dom'
import toast from 'react-hot-toast'

function Navbar() {
    const { theme, user } = useContext(ThemeContext)

    const navigate = useNavigate()
    const logout = () => {
        axios.delete("http://localhost:3000/api/v1/logout", { withCredentials: true })
            .then(res => {
                console.log(res.data)
                if (res.data.success) {
                    toast.success("Logout successfully");
                    localStorage.removeItem("user")
                    user[1]("")
                    navigate("/login", { replace: true })
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="navbar absolute top-0 bg-base-100 shadow-md px-6">
            <div className="flex-1 flex gap-10 ">
                <Link to={"/transactions"} className="text-xl font-bold"> Dashboard </Link>
                <Link to={"/payment-status"} className="text-xl font-bold"> Check-Pyament-Status </Link>
                <Link to={"/transactions/school/SCH-101"} className="text-xl font-bold"> Search-by-School-ID </Link>
            </div>
            <div className='flex gap-6'>
                <label className="toggle text-base-content">
                    <input type="checkbox" value={theme[0]} className="theme-controller"

                        onChange={() => theme[1](theme => theme === "light" ? "dark" : "light")}
                    />

                    <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></g></svg>

                    <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></g></svg>

                </label>
                {user[0] ?
                    (
                        <button className="flex gap-2 items-center cursor-pointer" onClick={logout}>
                            <LogOut className="size-5" />
                            <span className="hidden sm:inline">Logout</span>
                        </button>) :

                    (
                        <>
                            <Link to="/login" className="flex gap-2 items-center cursor-pointer"><LogIn className='size-5'/> Login</Link>
                            <Link to="/signup" className="flex gap-2 items-center cursor-pointer">Signup</Link>
                        </>)


                }
            </div>
        </div>
    )
}

export default Navbar
