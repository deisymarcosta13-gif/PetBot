export const handlePetFlow = (
    text,
    step,
    petRef,
    setStep,
    setMessages,
    setAiMode,
    sendToAPI
) => {

    if (step === 1) {

        petRef.current.name = text;

        setStep(2);

        setMessages(prev => [
            ...prev,
            {
                role: "bot",
                text: "¿Qué tipo es? (perro o gato)"
            }
        ]);

        return true;
    }

    if (step === 2) {

        petRef.current.type = text;

        setStep(3);

        setMessages(prev => [
            ...prev,
            {
                role: "bot",
                text: "¿Cuál es su raza?"
            }
        ]);

        return true;
    }

    if (step === 3) {

        petRef.current.breed = text;

        setMessages(prev => [
            ...prev,
            {
                role: "bot",
                text: "Guardando mascota..."
            }
        ]);

        setAiMode(false);
        setStep(0);

        sendToAPI();

        return true;
    }

    return false;
};