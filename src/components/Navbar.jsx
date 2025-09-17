
import { LogIn, LogOut, Menu } from "lucide-react";
import CheckStatusModal from '../pages/CheckStatusModal'
import { useContext, useState } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'


 function Navbar() {
    const { theme, user } = useContext(ThemeContext)
    const [open,setOpen] = useState(false)
    const navigate = useNavigate()
    const logout = () => {
        axios.delete("https://school-paymentanddashboardapplication.onrender.com/api/v1/logout", { withCredentials: true })
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
        <div className="navbar absolute top-0 bg-base-100 shadow-md px-4">
            {/* LEFT SECTION */}
            {/* <div className="flex-1"> */}
                {/* Mobile Dropdown */}
                <div className="dropdown ">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <Menu className="h-5 w-5" />
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        <li><Link to={"/transactions"}>Dashboard</Link></li>
                        {user[0]&&<li><button onClick={()=>setOpen(true)}>Check Status</button></li>}
                    </ul>
                </div>
                    
                <div className="hidden md:flex-1  md:flex gap-10 items-center ">
                    <Link to={"/transactions"} className="text-xl font-bold">Dashboard</Link>
                    {user[0] && <CheckStatusModal open={open} />}

                </div>
            

            {/* RIGHT SECTION */}
            <div className="flex flex-1  gap-4 items-center justify-end">
                {/* Theme Toggle */}
                <label className="toggle text-base-content">
                    <input
                        type="checkbox"
                        value={theme[0]}
                        className="theme-controller"
                        onChange={() => theme[1](t => t === "light" ? "dark" : "light")}
                    />
                    {/* Sun Icon */}
                    <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                        className="h-5 w-5">
                        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                            <circle cx="12" cy="12" r="4"></circle>
                            <path d="M12 2v2"></path>
                            <path d="M12 20v2"></path>
                            <path d="m4.93 4.93 1.41 1.41"></path>
                            <path d="m17.66 17.66 1.41 1.41"></path>
                            <path d="M2 12h2"></path>
                            <path d="M20 12h2"></path>
                            <path d="m6.34 17.66-1.41 1.41"></path>
                            <path d="m19.07 4.93-1.41 1.41"></path>
                        </g>
                    </svg>
                    {/* Moon Icon */}
                    <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                        className="h-5 w-5">
                        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                        </g>
                    </svg>
                </label>

                {/* Auth Links */}
                {user[0] ? (
                    <button className="flex gap-2 items-center cursor-pointer" onClick={logout}>
                        <LogOut className="h-5 w-5" />
                        <span className="hidden sm:inline">Logout</span>
                    </button>
                ) : (
                    <>
                        <Link to="/login" className="flex gap-2 items-center cursor-pointer">
                            <LogIn className="h-5 w-5" /> <span className="hidden sm:inline">Login</span>
                        </Link>
                        <Link to="/signup" className="flex gap-2 items-center cursor-pointer">
                            Signup
                        </Link>
                    </>
                )}
            </div>
            {open&&<CheckStatusModal open={open} />}
        </div>
    );
}
export default Navbar