import { Routes, Route } from "react-router-dom";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

import Homepage from "./pages/Homepage.jsx";
import GaleriaPage from "./pages/GaleriaPage.jsx";
import InqueritoPage from "./pages/InqueritoPage.jsx";
import ResultadosPage from "./pages/ResultadosPage.jsx";
import VoluntarioPage from "./pages/VoluntarioPage.jsx";
import BilheteiraPage from "./pages/BilheteiraPage.jsx";
import RespostaPage from "./pages/RespostaPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import "./assets/css/style.css";
import EventoPage from "./pages/EventoPage.jsx";


function App() {
    return (
        <>
            <Header />

            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/galeria" element={<GaleriaPage />} />
                <Route path="/inquerito" element={<InqueritoPage />} />
                <Route path="/resultados" element={<ResultadosPage />} />
                <Route path="/voluntarios" element={<VoluntarioPage />} />
                <Route path="/bilheteira" element={<BilheteiraPage />} />
                <Route path="/resposta" element={<RespostaPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/evento" element={<EventoPage />} />
            </Routes>

            <Footer />
        </>
    );
}

export default App;