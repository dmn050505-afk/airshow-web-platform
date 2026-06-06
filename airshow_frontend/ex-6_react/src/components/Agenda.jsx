import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const URL_EVENTOS = 'http://127.0.0.1:8000/api/eventos/';

const Agenda = () => {
    const [eventos, setEventos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(URL_EVENTOS)
            .then(response => setEventos(response.data))
            .catch(err => console.log('Erro ao carregar eventos', err));
    }, []);

    return (
        <section>
            <h2>Agenda</h2>
            <table>
                <tbody>
                    {eventos.map(evento => (
                        <tr key={evento.id}
                            onClick={() => navigate('/evento', {state: {eventoId: evento.id, eventoNome: evento.nome}})}
                            style={{cursor: 'pointer'}}>
                            <td>{evento.data}</td>
                            <td>{evento.local}</td>
                            <td>{evento.nome}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
};

export default Agenda;