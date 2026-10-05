export const selectPetForAppointmentFlow = (
    pet,
    appointmentRef,
    setAppointmentMode,
    setAppointmentStep,
    setMessages
) => {

    appointmentRef.current = {
        pet_id: pet.id,
        date: "",
        time: "",
        reason: ""
    };

    setAppointmentMode(true);
    setAppointmentStep(1);

    setMessages(prev => [
        ...prev,
        {
            role: "user",
            text: ` ${pet.name}`
        },
        {
            role: "bot",
            text: " ¿Qué fecha deseas para la cita? (YYYY-MM-DD)"
        }
    ]);

};