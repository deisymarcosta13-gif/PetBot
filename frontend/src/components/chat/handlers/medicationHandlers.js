import {
    createMedication,
    getMedications
} from "../../../services/medicationService";

import { BOT_MESSAGES } from "../messages/botMessages";

export const createMedicationHandler = async (
    medicationData,
    setMessages,
    setMedicationMode,
    setMedicationStep,
    showMedicationMenu
) => {

    try {

        await createMedication(
            medicationData
        );

        setMessages(prev => [
            ...prev,
            {
                role: "bot",
                text: BOT_MESSAGES.MEDICATION_CREATED
            }
        ]);

        setMedicationMode(false);
        setMedicationStep(0);

        showMedicationMenu();

    } catch {

        setMessages(prev => [
            ...prev,
            {
                role: "bot",
                text: BOT_MESSAGES.MEDICATION_ERROR
            }
        ]);

    }

};

export const getMedicationsHandler = async (
    setMessages,
    showMedicationMenu
) => {

    setMessages(prev => [
        ...prev,
        {
            role: "user",
            text: "Ver medicamentos"
        }
    ]);

    try {

        const medications =
            await getMedications();

        if (
            !medications ||
            medications.length === 0
        ) {

            setMessages(prev => [
                ...prev,
                {
                    role: "bot",
                    text: BOT_MESSAGES.MEDICATIONS_EMPTY
                }
            ]);

            showMedicationMenu();

            return;
        }

        setMessages(prev => [
            ...prev,
            {
                role: "medications",
                medications
            }
        ]);

        showMedicationMenu();

    } catch {

        setMessages(prev => [
            ...prev,
            {
                role: "bot",
                text: BOT_MESSAGES.MEDICATIONS_ERROR
            }
        ]);

    }

};