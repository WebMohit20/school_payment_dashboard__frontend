import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext()

export function ThemeProvider({ children }) {

    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light")
    const [user, setUser] = useState(localStorage.getItem("user") || "")



    useEffect(() => {
        localStorage.setItem("theme", theme)
    }, [theme])

    useEffect(()=>{
        localStorage.setItem("user",user)
    },[user])
    return (
        <ThemeContext.Provider value={{
            theme: [theme, setTheme],
            user: [user, setUser]
        }}>
            {children}
        </ThemeContext.Provider>
    )
}


