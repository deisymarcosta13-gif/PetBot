export const selectPetForMedicationFlow = (
    pet,
    medicationRef,
    setMedicationMode,
    setMedicationStep,
    setMessages
) => {

    medicationRef.current = {
        pet_id: pet.id,
        name: "",
        dosage: "",
        frequency: ""
    };

    setMedicationMode(true);
    setMedicationStep(1);

    setMessages(prev => [
        ...prev,
        {
            role: "user",
            text: ` ${pet.name}`
        },
        {
            role: "bot",
            text: " ¿Cuál es el nombre del medicamento?"
        }
    ]);

};