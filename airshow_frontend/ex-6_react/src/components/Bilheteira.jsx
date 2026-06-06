import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../context/AuthContext";
import { getCSRFToken } from '../api';

const URL_EVENTOS = 'http://127.0.0.1:8000/api/eventos/';
const URL_BILHETES = 'http://127.0.0.1:8000/api/bilhetes/';

function Bilheteira() {
    const navigate = useNavigate();
    const { user } = useUserContext();
    const [eventos, setEventos] = useState([]);
    const [eventoSelecionado, setEventoSelecionado] = useState('');
    const [tipo, setTipo] = useState('normal');

    useEffect(() => {
        axios.get(URL_EVENTOS)
            .then(response => setEventos(response.data))
            .catch(err => console.log('Erro ao carregar eventos', err));
    }, []);

    const getPreco = () => {
        const evento = eventos.find(e => e.id === parseInt(eventoSelecionado));
        if (!evento) return null;
        const preco = parseFloat(evento.preco_bilhete);
        return tipo === 'vip' ? (preco * 2).toFixed(2) : preco.toFixed(2);
    };

    const comprar = () => {
        if (!user) {
            navigate('/login');
            return;
        }
        if (!eventoSelecionado) {
            alert('Seleciona um evento!');
            return;
        }
        axios.post(URL_BILHETES, {
            evento: eventoSelecionado,
            tipo: tipo,
            username: user.username,
        }, {
            withCredentials: true,
            headers: { 'X-CSRFToken': getCSRFToken() }
        })
            .then(() => {
                navigate('/resposta', {
                    state: { mensagem: 'Compra realizada com sucesso!' }
                });
            })
            .catch(err => console.log('Erro ao comprar bilhete', err));
    };

    return (
        <div>
            <h2>Bilhetes</h2>

            <p>
                <label>Evento:</label>
                <select value={eventoSelecionado}
                        onChange={e => setEventoSelecionado(e.target.value)}>
                    <option value="">-- Seleciona um evento --</option>
                    {eventos.map(evento => (
                        <option key={evento.id} value={evento.id}>
                            {evento.nome} — {evento.data}
                        </option>
                    ))}
                </select>
            </p>

            <p>
                <label>Tipo de bilhete:</label>
                <select value={tipo} onChange={e => setTipo(e.target.value)}>
                    <option value="normal">Normal</option>
                    <option value="vip">VIP</option>
                </select>
            </p>

            {eventoSelecionado &&
                <p>Preço: <strong>{getPreco()}€</strong></p>
            }

            {!user && <p style={{color: 'red'}}>Tens de fazer login para comprar bilhetes!</p>}

            <button onClick={comprar}>Comprar</button>
        </div>
    );
}

export default Bilheteira;