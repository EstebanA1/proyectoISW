// Calendar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Fullcalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import esLocale from "@fullcalendar/core/locales/es";
import { Button } from "@mui/material";

function Calendar(props) {
    const router = useNavigate();
    const citas = props.citas;
    const calendarRef = React.useRef();

    const convertirFecha = (fechaString) => {
        const partes = fechaString.split("/");

        const dia = parseInt(partes[0]);
        const mes = parseInt(partes[1]) - 1;
        const año = parseInt(partes[2]);

        const fechaObjeto = new Date(año, mes, dia);

        return fechaObjeto;
    };

    React.useEffect(() => {
        const calendar = calendarRef.current.getApi();
        calendar.addEventSource(citas.map(cita => ({
            title: [cita.name, cita.hour],
            start: convertirFecha(cita.date),
            url: `/citas/${cita._id}`
        })));
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
                    right: "custom1",
                }}

                customButtons={{
                    custom1: {
                        text: 'Listado de Citas',
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
                dayCellContent={(info) => {
                    const dia = info.date;

                    const hoy = new Date();
                    hoy.setHours(0, 0, 0, 0);

                    const fechaFormateada = `${dia.getDate()}-${dia.getMonth() + 1}-${dia.getFullYear()}`;

                    return (
                        <div>
                            <div className="dia">{dia.getDate()}</div>

                            {dia > hoy && (
                                <div className="invibleButton" style={{ position: 'absolute', width: '100%' }}>
                                    <Button onClick={() => router(`/citas/create/${fechaFormateada}`)}>Agregar cita</Button>
                                </div>
                            )}
                        </div>
                    );
                }}
            />
        </div>
    );
}

export default Calendar;
