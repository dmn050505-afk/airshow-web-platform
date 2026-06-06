import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getCSRFToken } from "../api";

const URL_VOTOS = 'http://127.0.0.1:8000/api/votos/';

function Inquerito() {
    const [opcao, setOpcao] = useState("");
    const navigate = useNavigate();

    const equipas = [
        "Red Bull Air Team",
        "F16 Demo",
        "Patrouille Suisse",
        "Força Aérea Portuguesa"
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(URL_VOTOS, {
            opcao: opcao,
        }, {
            withCredentials: true,
            headers: { 'X-CSRFToken': getCSRFToken() }
        })
            .then(() => {
                navigate("/resultados", { state: { opcao } });
            })
            .catch(err => console.log('Erro ao submeter voto', err));
    };

    return (
        <div>
            <h2>Inquérito</h2>
            <form onSubmit={handleSubmit}>
                <p>O que estás mais ansioso por ver?</p>
                {equipas.map((equipa) => (
                    <label key={equipa}>
                        <input
                            type="radio"
                            name="equipa"
                            value={equipa}
                            checked={opcao === equipa}
                            onChange={(e) => setOpcao(e.target.value)}
                            required
                        />
                        {equipa}
                        <br/>
                    </label>
                ))}
                <br/>
                <button type="submit">Submeter</button>
            </form>
        </div>
    );
}

export default Inquerito;