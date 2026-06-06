import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SIGNUP_URL = 'http://127.0.0.1:8000/api/register/';

function SignupPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [erro, setErro] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(SIGNUP_URL, { username, password })
            .then(() => {
                navigate('/login');
            })
            .catch(() => setErro('Erro ao criar conta. Tenta outro username.'));
    };

    return (
        <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px' }}>
            <h2>Criar Conta</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {erro && <p style={{ color: 'red' }}>{erro}</p>}
                <button type="submit">Registar</button>
                <button type="button" onClick={() => navigate('/login')}>
                    Já tenho conta
                </button>
            </form>
        </div>
    );
}

export default SignupPage;