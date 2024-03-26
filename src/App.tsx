import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Root from "@/layouts/Root"
import Main from "@/layouts/Main"
import Portfolio from "./pages/Portfolio"
import Loading from "./pages/Loading"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import Home from "./pages/Home"
import Search from "./pages/Search"
import Test from "./pages/Test"

// providers
import ThemeProvider from "./providers/ThemeProvider"
import AuthProvider from "./providers/AuthProvider"

// loaders
import { homeLoader } from "./loaders/homeLoader"
import { profileLoader } from "./loaders/profileLoader"

// actions
import { profileAction } from "./actions/profileAction"

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="" element={<Root />}>
            <Route path="" element={<Main />}>
                <Route path="portfolio" element={<Portfolio />} loader={profileLoader} action={profileAction} />
                <Route index element={<Home />} loader={homeLoader} />
            </Route>            
            <Route path="loading" element={<Loading />} /> {/* this route is temporary */}
            <Route path="signup" element={<Signup />} />
            <Route path="signin" element={<Signin />} />
            <Route path="search" element={<Search />} />
            <Route path="test" element={<Test />} />
        </Route>
    )
)

function App() {
    return (
        <AuthProvider>
            <ThemeProvider>
                <RouterProvider router={router} />
            </ThemeProvider>
        </AuthProvider>
    )
}

export default App
