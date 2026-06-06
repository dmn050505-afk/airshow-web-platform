import { useState, useEffect } from "react";
import Nav from "../components/Nav.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const URL_VOTOS = 'http://127.0.0.1:8000/api/votos/';

function ResultadosPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const opcao = location.state?.opcao;
    const [resultados, setResultados] = useState({});

    useEffect(() => {
        axios.get(URL_VOTOS)
            .then(response => {
                const contagem = {};
                response.data.forEach(voto => {
                    contagem[voto.opcao] = (contagem[voto.opcao] || 0) + 1;
                });
                setResultados(contagem);
            })
            .catch(err => console.log('Erro ao carregar resultados', err));
    }, []);

    return (
        <div>
            <Nav/>
            <div className="full-width">
                <section>
                    <h2>Resultado do Inquérito</h2>
                    <p>O teu favorito: <strong>{opcao}</strong></p>
                    <h3>Resultados acumulados:</h3>
                    <ul>
                        {Object.entries(resultados).map(([equipa, votos]) => (
                            <li key={equipa}>
                                {equipa}: {votos} votos
                            </li>
                        ))}
                    </ul>
                    <br/>
                    <button onClick={() => navigate("/")}>
                        Voltar à homepage
                    </button>
                </section>
            </div>
        </div>
    );
}

export default ResultadosPage;