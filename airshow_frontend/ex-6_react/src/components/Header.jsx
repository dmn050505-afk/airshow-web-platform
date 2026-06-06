import imgLogo from '../assets/cartaz.png';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/AuthContext';

const Header = () => {
    const navigate = useNavigate();
    const { user, logout } = useUserContext();

    const handleLogout = () => {
        logout().then(() => navigate('/'));
    };

    return (
        <header>
            <h1>ISCTE-IUL AirShow 2026</h1>
            <a href="index.html">
                <img id="logo" src={imgLogo} alt="cartaz"/>
            </a>
            <p>Aviação - Drones - Tecnologia</p>

            {user ?
                <>
                    <p>Olá, {user.username}!</p>
                    <button onClick={handleLogout}>Logout</button>
                </>
                :
                <>
                    <button onClick={() => navigate('/login')}>Login</button>
                    <button onClick={() => navigate('/signup')}>Registar</button>
                </>
            }
        </header>
    );
};

export default Header;