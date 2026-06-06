import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const URL_VOLUNTARIOS = 'http://127.0.0.1:8000/api/voluntarios/';

function VoluntarioForm() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        nome: "",
        email: "",
        telemovel: "",
        dias: []
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleCheckbox = (e) => {
        const {value, checked} = e.target;
        let novosDias = [...form.dias];
        if (checked) {
            novosDias.push(value);
        } else {
            novosDias = novosDias.filter(d => d !== value);
        }
        setForm({ ...form, dias: novosDias });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(URL_VOLUNTARIOS, {
            nome: form.nome,
            email: form.email,
            telemovel: form.telemovel,
            dias: form.dias.join(', '),
        })
            .then(() => {
                navigate("/resposta", {
                    state: { mensagem: "Obrigado pela sua candidatura!" }
                });
            })
            .catch(err => console.log('Erro ao submeter candidatura', err));
    };

    return (
        <form onSubmit={handleSubmit}>
            <p>
                Nome:
                <input
                    type="text"
                    name="nome"
                    value={form.nome}
                    onChange={handleChange}
                    required
                />
            </p>
            <p>
                Email:
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
            </p>
            <p>
                Telemóvel:
                <input
                    type="tel"
                    name="telemovel"
                    value={form.telemovel}
                    onChange={handleChange}
                    required
                />
            </p>
            <h3>Disponibilidade:</h3>
            <label>
                <input
                    type="checkbox"
                    value="15 Fevereiro"
                    onChange={handleCheckbox}
                />
                15 Fevereiro
            </label>
            <label>
                <input
                    type="checkbox"
                    value="16 Fevereiro"
                    onChange={handleCheckbox}
                />
                16 Fevereiro
            </label>
            <br/><br/>
            <button>Submeter candidatura</button>
        </form>
    );
}

export default VoluntarioForm;