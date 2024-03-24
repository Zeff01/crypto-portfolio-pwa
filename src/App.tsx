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
import AppLoading from "./components/common/AppLoading"

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="" element={<Root />}>
            <Route path="" element={<Main />}>
                <Route path="portfolio" element={<Portfolio />} />
                <Route index element={<Home />} />
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
        <RouterProvider router={router} />
    )
}

export default App
