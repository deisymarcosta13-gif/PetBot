import {
    getPets as getPetsService
} from "../../../services/petService";


export const startMedicationConversation = async (
    setMessages,
    selectPetForMedication
) => {

    setMessages(prev => [
        ...prev,
        {
            role: "user",
            text: "Agregar medicamento"
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
                text: " ¿A qué mascota deseas agregar el medicamento?",
                buttons: pets.map(pet => ({
                    label: ` ${pet.name}`,
                    onClick: () =>
                        selectPetForMedication(pet)
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