import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUserContext } from '../context/AuthContext';
import { getCSRFToken } from '../api';

const URL_EVENTOS = 'http://127.0.0.1:8000/api/eventos/';
const URL_COMENTARIOS = 'http://127.0.0.1:8000/api/comentarios/';

function EventoPage() {
    const location = useLocation();
    const eventoId = location.state.eventoId;
    const navigate = useNavigate();
    const { user } = useUserContext();
    const [evento, setEvento] = useState(null);
    const [comentarios, setComentarios] = useState([]);
    const [texto, setTexto] = useState('');

    useEffect(() => {
        axios.get(URL_EVENTOS + eventoId + '/')
            .then(response => setEvento(response.data))
            .catch(err => console.log('Erro ao carregar evento', err));

        axios.get(URL_COMENTARIOS + '?evento=' + eventoId)
            .then(response => setComentarios(response.data))
            .catch(err => console.log('Erro ao carregar comentários', err));
    }, [eventoId]);

    const submeterComentario = (e) => {
        e.preventDefault();
        axios.post(URL_COMENTARIOS, {
            evento: eventoId,
            texto: texto,
            username: user.username,
        }, {
            withCredentials: true,
            headers: { 'X-CSRFToken': getCSRFToken() }
        })
            .then(response => {
                setComentarios([...comentarios, response.data]);
                setTexto('');
            })
            .catch(err => console.log('Erro ao submeter comentário', err));
    };

    if (!evento) return <p>A carregar...</p>;

    return (
        <div>
            <h2>{evento.nome}</h2>
            <p>{evento.data} — {evento.local}</p>
            <p>{evento.descricao}</p>

            <button onClick={() => navigate('/')}>Voltar</button>

            <h3>Comentários</h3>
            {comentarios.length === 0 && <p>Ainda não há comentários.</p>}
            {comentarios.map(c => (
                <div key={c.id}>
                    <p><b>{c.username}</b>: {c.texto}</p>
                </div>
            ))}

            {user ?
                <form onSubmit={submeterComentario}>
                    <textarea
                        value={texto}
                        onChange={e => setTexto(e.target.value)}
                        placeholder="Escreve um comentário..."
                        required
                    />
                    <button type="submit">Comentar</button>
                </form>
                :
                <p>Tens de fazer <a href="/login">login</a> para comentar.</p>
            }
        </div>
    );
}

export default EventoPage;