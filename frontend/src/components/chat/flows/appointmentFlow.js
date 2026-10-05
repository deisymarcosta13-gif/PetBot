export const handleAppointmentFlow = (
    text,
    appointmentStep,
    appointmentRef,
    setAppointmentStep,
    setMessages,
    sendAppointmentToAPI
) => {
    if (appointmentStep === 1) {

        // 1. validar formato
        const isValidFormat = /^\d{4}-\d{2}-\d{2}$/.test(text);

        if (!isValidFormat) {
            setMessages(prev => [
                ...prev,
                {
                    role: "bot",
                    text: "Formato inválido. Usa YYYY-MM-DD"
                }
            ]);
            return true;
        }

        // 2. validar fecha pasada
        const inputDate = new Date(text + "T00:00:00");
        const today = new Date();

        // limpiar horas para comparar solo fechas
        today.setHours(0, 0, 0, 0);

        if (inputDate < today) {
            setMessages(prev => [
                ...prev,
                {
                    role: "bot",
                    text: "No puedes agendar citas en fechas pasadas. Ingresa una fecha válida."
                }
            ]);
            return true;
        }

        appointmentRef.current.date = text;
        setAppointmentStep(2);

        setMessages(prev => [
            ...prev,
            {
                role: "bot",
                text: "¿A qué hora? (HH:MM)"
            }
        ]);

        return true;
    }

    if (appointmentStep === 2) {

        appointmentRef.current.time = text;

        setAppointmentStep(3);

        setMessages(prev => [
            ...prev,
            {
                role: "bot",
                text: "¿Cuál es el motivo de la cita?"
            }
        ]);

        return true;
    }

    if (appointmentStep === 3) {

        appointmentRef.current.reason = text;

        setMessages(prev => [
            ...prev,
            {
                role: "bot",
                text: "Guardando cita..."
            }
        ]);

        sendAppointmentToAPI();

        return true;
    }

    return false;
};