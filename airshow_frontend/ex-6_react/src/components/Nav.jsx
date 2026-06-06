import {Link} from "react-router-dom";

const Nav = () => {

    return (

        <nav>

            <Link to="/">
                Início
            </Link>

            <Link to="/galeria">
                Galeria
            </Link>

            <Link to="/inquerito">
                Inquérito
            </Link>

            <Link to="/voluntarios">
                Candidate-se
            </Link>

            <Link to="/bilheteira">
                Bilhetes
            </Link>

        </nav>

    )

}

export default Nav;