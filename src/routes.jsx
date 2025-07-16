import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cap2 from "./pages/Cap2";
import Transitorios from "./pages/Transitorios";
import About from "./pages/About"
import ErrorPage from "./pages/Error404";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Cap2 />}></Route>
                <Route path="/transitorios" element={<Transitorios />}></Route>
                <Route path="/Sobre" element={<About />}></Route>
                <Route path="*" element={<ErrorPage />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;