export const startPetConversation = (
    setMessages,
    setAiMode,
    setStep,
    petRef
) => {

    setAiMode(true);
    setStep(1);

    petRef.current = {
        name: "",
        type: "",
        breed: ""
    };

    setMessages(prev => [
        ...prev,
        {
            role: "user",
            text: "Agregar mascota"
        },
        {
            role: "bot",
            text: " Vamos a agregar una mascota.\n\n¿Cómo se llama?"
        }
    ]);

};