import {
    createAppointment,
    getAppointments
} from "../../../services/appointmentService";

import { BOT_MESSAGES } from "../messages/botMessages";

export const createAppointmentHandler = async (
    appointmentData,
    setMessages,
    setAppointmentMode,
    setAppointmentStep,
    showAppointmentMenu
) => {

    try {

        await createAppointment(
            appointmentData
        );

        setMessages(prev => [
            ...prev,
            {
                role: "bot",
                text: BOT_MESSAGES.APPOINTMENT_CREATED
            }
        ]);

        setAppointmentMode(false);
        setAppointmentStep(0);

        showAppointmentMenu();

    } catch {

        setMessages(prev => [
            ...prev,
            {
                role: "bot",
                text: BOT_MESSAGES.APPOINTMENT_ERROR
            }
        ]);

    }

};

export const getAppointmentsHandler = async (
    setMessages,
    showAppointmentMenu
) => {

    setMessages(prev => [
        ...prev,
        {
            role: "user",
            text: "Ver citas"
        }
    ]);

    try {

        const appointments =
            await getAppointments();

        if (
            !appointments ||
            appointments.length === 0
        ) {

            setMessages(prev => [
                ...prev,
                {
                    role: "bot",
                    text: BOT_MESSAGES.APPOINTMENTS_EMPTY
                }
            ]);

            showAppointmentMenu();

            return;
        }

        setMessages(prev => [
            ...prev,
            {
                role: "appointments",
                appointments
            }
        ]);

        showAppointmentMenu();

    } catch {

        setMessages(prev => [
            ...prev,
            {
                role: "bot",
                text: BOT_MESSAGES.APPOINTMENTS_ERROR
            }
        ]);

    }

};