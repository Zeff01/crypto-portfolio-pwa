import  { createContext, useState, useLayoutEffect, ReactNode, useContext} from 'react'

type ThemeContextType = {
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType|null>(null)
export default function ThemeProvider({children}:{children:ReactNode}) {

    const [theme, setTheme] = useState<"light"|"dark">(localStorage.getItem("theme") as "light"|"dark" ?? "light");

    function toggleTheme() {
        setTheme(m => m ===  "light" ? "dark" : "light")
    }

    useLayoutEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useGlobalTheme() {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('theme context error')
    }
    return context
}