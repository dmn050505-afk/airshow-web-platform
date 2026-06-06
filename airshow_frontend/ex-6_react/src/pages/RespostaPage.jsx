import Nav from "../components/Nav.jsx";
import {useLocation} from "react-router-dom";

function RespostaPage() {

    const location = useLocation();

    const mensagem = location.state?.mensagem;

    return (

        <div>

            <Nav/>

            <div className="full-width">

                <section>

                    <h2>

                        {mensagem}

                    </h2>

                </section>

            </div>

        </div>

    );

}

export default RespostaPage;