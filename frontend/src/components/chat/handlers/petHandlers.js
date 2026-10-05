import { createPet, getPets } from "../../../services/petService";
import { BOT_MESSAGES } from "../messages/botMessages";

export const createPetHandler = async (
    petData,
    setMessages,
    showPetsMenu
) => {

    try {

        await createPet(petData);

        setMessages(prev => [
            ...prev,
            {
                role: "bot",
                text: BOT_MESSAGES.PET_CREATED
            }
        ]);

        showPetsMenu();

    } catch {

        setMessages(prev => [
            ...prev,
            {
                role: "bot",
                text: BOT_MESSAGES.PET_ERROR
            }
        ]);

    }

};

export const getPetsHandler = async (
    setMessages,
    showPetsMenu
) => {

    setMessages(prev => [
        ...prev,
        {
            role: "user",
            text: "Ver mascotas"
        }
    ]);

    try {

        const pets = await getPets();

        if (!pets || pets.length === 0) {

            setMessages(prev => [
                ...prev,
                {
                    role: "bot",
                    text: BOT_MESSAGES.PETS_EMPTY
                }
            ]);

            showPetsMenu();

            return;
        }

        setMessages(prev => [
            ...prev,
            {
                role: "pets",
                pets
            }
        ]);

        showPetsMenu();

    } catch {

        setMessages(prev => [
            ...prev,
            {
                role: "bot",
                text: BOT_MESSAGES.PETS_ERROR
            }
        ]);

    }

};