import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/AuthContext';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [erro, setErro] = useState('');
    const navigate = useNavigate();
    const { login } = useUserContext();

    const handleLogin = (e) => {
        e.preventDefault();
        login(username, password)
            .then(() => navigate('/'))
            .catch(() => setErro('Credenciais inválidas. Tenta novamente.'));
    };

    return (
        <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px' }}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
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
                <button type="submit">Login</button>
                <button type="button" onClick={() => navigate('/signup')}>
                    Criar conta
                </button>
                <button type="button" onClick={() => navigate('/')}>
                    Voltar
                </button>
            </form>
        </div>
    );
}

export default LoginPage;