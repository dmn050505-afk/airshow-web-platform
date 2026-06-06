import {useState, useEffect} from "react";

function Countdown() {

    const dataEvento = new Date("2027-02-15T12:00:00");

    const calcularTempoRestante = () => {

        const agora = new Date();

        const diferenca = dataEvento - agora;

        if (diferenca <= 0) {

            return {

                dias: 0,
                horas: 0,
                minutos: 0,
                segundos: 0

            };

        }

        return {

            dias: Math.floor(diferenca / (1000 * 60 * 60 * 24)),

            horas: Math.floor(
                (diferenca / (1000 * 60 * 60)) % 24
            ),

            minutos: Math.floor(
                (diferenca / (1000 * 60)) % 60
            ),

            segundos: Math.floor(
                (diferenca / 1000) % 60
            )

        };

    };

    const [tempo, setTempo] = useState(
        calcularTempoRestante()
    );

    useEffect(() => {

        const intervalo = setInterval(() => {

            setTempo(calcularTempoRestante());

        }, 1000);
        return () => clearInterval(intervalo);

    }, []);

    return (

        <div>

            <h2>

                O evento começa em:

            </h2>

            <p>


                {tempo.dias} dias {" "}
                {tempo.horas} horas {" "}
                {tempo.minutos} min {" "}
                {tempo.segundos} seg

            </p>

        </div>

    );

}

export default Countdown;