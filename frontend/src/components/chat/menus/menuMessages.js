import { USER_MESSAGES } from "../messages/userMessages";

export const buildMainMenu = (
    name,
    goToPetsMenu,
    goToMedicationMenu,
    goToAppointmentsMenu
) => ({
    role: "options",
    text: `Hola ${name}

¿A qué sección deseas ingresar hoy?`,
    buttons: [
        {
            label: USER_MESSAGES.PETS_MENU,
            onClick: goToPetsMenu
        },
        {
            label: USER_MESSAGES.MEDICATIONS_MENU,
            onClick: goToMedicationMenu
        },
        {
            label: USER_MESSAGES.APPOINTMENTS_MENU,
            onClick: goToAppointmentsMenu
        }
    ]
});

export const buildPetsMenu = (
    startPetFlow,
    getPets,
    goToMainMenu
) => ({
    role: "options",
    text: `Sección Mascotas

¿Qué deseas hacer?`,
    buttons: [
        {
            label: USER_MESSAGES.ADD_PET,
            onClick: startPetFlow
        },
        {
            label: USER_MESSAGES.VIEW_PETS,
            onClick: getPets
        },
        {
            label: USER_MESSAGES.MAIN_MENU,
            onClick: goToMainMenu
        }
    ]
});

export const buildMedicationMenu = (
    startMedicationFlow,
    getMedications,
    goToMainMenu
) => ({
    role: "options",
    text: ` Sección Medicamentos

¿Qué deseas hacer?`,
    buttons: [
        {
            label: USER_MESSAGES.ADD_MEDICATION,
            onClick: startMedicationFlow
        },
        {
            label: USER_MESSAGES.VIEW_MEDICATIONS,
            onClick: getMedications
        },
        {
            label: USER_MESSAGES.MAIN_MENU,
            onClick: goToMainMenu
        }
    ]
});

export const buildAppointmentMenu = (
    startAppointmentFlow,
    getAppointments,
    goToMainMenu
) => ({
    role: "options",
    text: ` Sección Citas

¿Qué deseas hacer?`,
    buttons: [
        {
            label: USER_MESSAGES.ADD_APPOINTMENT,
            onClick: startAppointmentFlow
        },
        {
            label: USER_MESSAGES.VIEW_APPOINTMENTS,
            onClick: getAppointments
        },
        {
            label: USER_MESSAGES.MAIN_MENU,
            onClick: goToMainMenu
        }
    ]
});