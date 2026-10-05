export const handleMedicationFlow = (
    text,
    medicationStep,
    medicationRef,
    setMedicationStep,
    setMessages,
    sendMedicationToAPI
) => {

    if (medicationStep === 1) {

        medicationRef.current.name = text;

        setMedicationStep(2);

        setMessages(prev => [
            ...prev,
            {
                role: "bot",
                text: "¿Cuál es la dosis?"
            }
        ]);

        return true;
    }

    if (medicationStep === 2) {

        medicationRef.current.dosage = text;

        setMedicationStep(3);

        setMessages(prev => [
            ...prev,
            {
                role: "bot",
                text: "¿Con qué frecuencia debe administrarse?"
            }
        ]);

        return true;
    }

    if (medicationStep === 3) {

        medicationRef.current.frequency = text;

        setMessages(prev => [
            ...prev,
            {
                role: "bot",
                text: "Guardando medicamento..."
            }
        ]);

        sendMedicationToAPI();

        return true;
    }

    return false;
};