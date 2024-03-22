import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Root from "@/layouts/Root"
import Main from "@/layouts/Main"
import Portfolio from "./pages/Portfolio"
import Loading from "./pages/Loading"
import Signup from "./pages/Signup"

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="" element={<Root />}>
            <Route path="" element={<Main />}>
                <Route path="portfolio" element={<Portfolio />} />
            </Route>
            <Route path="loading" element={<Loading />} />
            <Route path="signup" element={<Signup />} />

        </Route>
    )
)

function App() {
    return (
        <RouterProvider router={router} />
    )
}

export default App
