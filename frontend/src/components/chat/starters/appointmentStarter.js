import {
    getPets as getPetsService
} from "../../../services/petService";

export const startAppointmentConversation = async (
    setMessages,
    selectPetForAppointment
) => {

    setMessages(prev => [
        ...prev,
        {
            role: "user",
            text: " Agendar cita"
        }
    ]);

    try {

        const pets = await getPetsService();

        if (!pets || pets.length === 0) {

            setMessages(prev => [
                ...prev,
                {
                    role: "bot",
                    text: "Primero debes registrar una mascota."
                }
            ]);

            return;
        }

        setMessages(prev => [
            ...prev,
            {
                role: "options",
                text: " ¿Para qué mascota deseas agendar la cita?",
                buttons: pets.map(pet => ({
                    label: ` ${pet.name}`,
                    onClick: () =>
                        selectPetForAppointment(pet)
                }))
            }
        ]);

    } catch {

        setMessages(prev => [
            ...prev,
            {
                role: "bot",
                text: "Error obteniendo las mascotas."
            }
        ]);

    }

};