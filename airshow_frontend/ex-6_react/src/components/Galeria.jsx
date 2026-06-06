import { useState, useEffect } from 'react';
import axios from 'axios';
import Entidade from "./Entidade";

const URL_AERONAVES = 'http://127.0.0.1:8000/api/aeronaves/';

function Galeria() {
    const [aeronaves, setAeronaves] = useState([]);

    useEffect(() => {
        axios.get(URL_AERONAVES)
            .then(response => setAeronaves(response.data))
            .catch(err => console.log('Erro ao carregar aeronaves', err));
    }, []);

    return (
        <div>
            <h2>Participantes</h2>
            <div className="galeria">
                {aeronaves.map((item) => (
                <Entidade
                    key={item.id}
                    nome={item.nome}
                    imagem={item.imagem ? 'http://127.0.0.1:8000' + item.imagem : ''}
                    descricao={item.descricao}
                    data={item.data}
                />
            ))}
            </div>
        </div>
    );
}



export default Galeria;