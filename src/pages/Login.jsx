import { useState, useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext';
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, } from "lucide-react";
import axios from 'axios';
import toast from 'react-hot-toast';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const {user} = useContext(ThemeContext)
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/api/v1/login", formData, { withCredentials: true })
            .then(res => {
                console.log(res.data)
                if (res.data.success) {
                    toast.success("Logged in successfully");
                    user[1](res.data.loggedInUser.name)
                    navigate("/transactions",{replace:true})
                    setFormData({
                        email: "",
                        password: ""
                    })
                }
            })
            .catch(err => console.log(err))
    };
    return (
        <div className="flex flex-col w-lg h-full justify-center items-center p-6 sm:p-12">
            <div className="w-full max-w-md space-y-8">


                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Email</span>
                        </label>
                        <div className="relative">
                            <div className="absolute z-10 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-base-content/40" />
                            </div>
                            <input
                                type="email"
                                className={`input input-bordered w-full pl-10`}
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Password</span>
                        </label>
                        <div className="relative">
                            <div className="absolute z-10 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-base-content/40" />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                className={`input input-bordered w-full pl-10`}
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                            <button
                                type="button"
                                className="absolute z-10 inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5 text-base-content/40" />
                                ) : (
                                    <Eye className="h-5 w-5 text-base-content/40" />
                                )}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary w-full">
                        Sign in
                    </button>
                </form>

                <div className="text-center">
                    <p className="text-base-content/60">
                        Don&apos;t have an account?{" "}
                        <Link to="/signup" className="link link-primary">
                            Create account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login
