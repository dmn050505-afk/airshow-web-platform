import Nav from "../components/Nav.jsx";
import Sobre from "../components/Sobre.jsx";
import Agenda from "../components/Agenda.jsx";
import News from "../components/News.jsx";
import EventosSemelhantes from "../components/EventosSemelhantes.jsx";
import Countdown from "../components/Countdown.jsx";

function Homepage() {

    return (

        <div>

            <Nav/>

            <div className="top-layout">

                <div className="left-content">

                    <section>
                        <Sobre/>
                    </section>


                </div>

                <div className="right-content">

                    <aside>
                        <News/>
                    </aside>

                </div>

            </div>

            <div className="full-width">

                <section>
                    <Countdown/>
                </section>

                <section>
                    <Agenda/>
                </section>

                <section>

                    <EventosSemelhantes/>

                </section>

            </div>

        </div>

    )

}

export default Homepage;