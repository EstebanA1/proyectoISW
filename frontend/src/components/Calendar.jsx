import React from "react";
import { useNavigate } from "react-router-dom";
import Fullcalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import esLocale from "@fullcalendar/core/locales/es";

function Calendar(props) {
    const router = useNavigate();
    const citas = props.citas;

    const calendarRef = React.useRef();

    // Creamos la función auxiliar para convertir la fecha
    const convertirFecha = (fechaString) => {
        // Usamos split para separar la cadena por los caracteres "/"
        const partes = fechaString.split("/");

        // Obtenemos el día, el mes y el año como números
        const dia = parseInt(partes[0]);
        const mes = parseInt(partes[1]) - 1; // Restamos 1 porque los meses empiezan en 0
        const año = parseInt(partes[2]);

        // Creamos un objeto de fecha con los elementos anteriores
        const fechaObjeto = new Date(año, mes, dia);

        // Devolvemos el objeto de fecha
        return fechaObjeto;
    };


    React.useEffect(() => {
        const calendar = calendarRef.current.getApi();
        calendar.addEventSource(citas.map(cita => ({
            title: cita.name,
            start: convertirFecha(cita.date),
            url: `/citas/${cita._id}`
        })
        ));
    }, [citas]);

    return (
        <div>
            <br />
            <Fullcalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView={"dayGridMonth"}
                headerToolbar={{
                    left: "prev,next",
                    center: "title",
                    right: "custom1"
                }}

                customButtons={{
                    custom1: {
                        text: 'Listado Citas',
                        click: function () {
                            router("/citas/listado");
                        }
                    }
                }}
                height="100vh"
                locale={esLocale}
                ref={calendarRef}
                eventClick={function (info) {
                    info.jsEvent.preventDefault();
                    router(info.event.url);
                }}
            />
        </div>


    );
}

export default Calendar; 