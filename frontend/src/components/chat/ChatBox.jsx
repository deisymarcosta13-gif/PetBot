import { useEffect, useRef, useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";

import { s } from "../../styles/chatStyles";
import { Icon } from "../../icons/chatIcons";

import {
    createPet,
    getPets as getPetsService
} from "../../services/petService";

import {
    createMedication,
    getMedications as getMedicationsService
} from "../../services/medicationService";

import {
    createAppointment,
    getAppointments as getAppointmentsService
} from "../../services/appointmentService";

import {
    buildMainMenu,
    buildPetsMenu,
    buildMedicationMenu,
    buildAppointmentMenu
} from "./menus/menuMessages";

import { navigateToMenu } from "./navigation/chatNavigation";

import {
    createPetHandler,
    getPetsHandler
} from "./handlers/petHandlers";

import {
    createMedicationHandler,
    getMedicationsHandler
} from "./handlers/medicationHandlers";

import {
    createAppointmentHandler,
    getAppointmentsHandler
} from "./handlers/appointmentHandlers";

import { handlePetFlow } from "./flows/petFlow";
import { handleMedicationFlow } from "./flows/medicationFlow";
import { handleAppointmentFlow } from "./flows/appointmentFlow";

import { startPetConversation } from "./starters/petStarter";
import { startMedicationConversation } from "./starters/medicationStarter";
import { startAppointmentConversation } from "./starters/appointmentStarter";

import {selectPetForMedicationFlow} from "./selectors/medicationSelector";
import {selectPetForAppointmentFlow} from "./selectors/appointmentSelector";

import { sendChatMessage } from "../../services/chatService";

function ChatBox() {

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [userName, setUserName] = useState("usuario");

    const [aiMode, setAiMode] = useState(false);
    const [step, setStep] = useState(0);

    const petRef = useRef({
        name: "",
        type: "",
        breed: ""
    });

    const medicationRef = useRef({
        name: "",
        dosage: "",
        frequency: "",
        pet_id: null
    });

    const appointmentRef = useRef({
        date: "",
        time: "",
        reason: "",
        pet_id: null
    });

    const [medicationMode, setMedicationMode] = useState(false);
    const [medicationStep, setMedicationStep] = useState(0);

    const [appointmentMode, setAppointmentMode] = useState(false);
    const [appointmentStep, setAppointmentStep] = useState(0);

    const messagesEnd = useRef(null);

    useEffect(() => {

    const user = JSON.parse(
            localStorage.getItem("user")
        );

        const name = user?.name || "usuario";

        setUserName(name);

        loadMainMenuFromBackend();

    }, []);

    useEffect(() => {

        messagesEnd.current?.scrollIntoView({
            behavior: "smooth"
        });

    }, [messages]);
    
    const showMainMenu = () => {

        loadMainMenuFromBackend();

    };

    const showPetsMenu = () => {

        setMessages(prev => [
            ...prev,
            buildPetsMenu(
                startPetFlow,
                getPets,
                goToMainMenu
            )
        ]);

    };

    const showMedicationMenu = () => {

        setMessages(prev => [
            ...prev,
            buildMedicationMenu(
                startMedicationFlow,
                getMedications,
                goToMainMenu
            )
        ]);

    };

    const showAppointmentMenu = () => {

        setMessages(prev => [
            ...prev,
            buildAppointmentMenu(
                startAppointmentFlow,
                getAppointments,
                goToMainMenu
            )
        ]);

    };

    const goToMedicationMenu = () =>
    navigateToMenu(
        setMessages,
        " Medicamentos",
        showMedicationMenu
    );

    const goToMainMenu = () =>
    navigateToMenu(
        setMessages,
        " Menú principal",
        showMainMenu
    );

    const goToPetsMenu = async () => {

        setMessages(prev => [
            ...prev,
            {
                role: "user",
                text: "Mascotas"
            }
        ]);

        await openPetsMenuFromBackend();

    };

    const goToAppointmentsMenu = () =>
    navigateToMenu(
        setMessages,
        " Citas",
        showAppointmentMenu
    );

    const sendToAPI = () =>
    createPetHandler(
        petRef.current,
        setMessages,
        showPetsMenu
    );

    const getPets = () =>
    getPetsHandler(
        setMessages,
        showPetsMenu
    );

    const sendMedicationToAPI = () =>
    createMedicationHandler(
        medicationRef.current,
        setMessages,
        setMedicationMode,
        setMedicationStep,
        showMedicationMenu
    );

    const getMedications = () =>
    getMedicationsHandler(
        setMessages,
        showMedicationMenu
    );

    const sendAppointmentToAPI = () =>
    createAppointmentHandler(
        appointmentRef.current,
        setMessages,
        setAppointmentMode,
        setAppointmentStep,
        showAppointmentMenu
    );

    const getAppointments = () =>
    getAppointmentsHandler(
        setMessages,
        showAppointmentMenu
    );

    const openPetsMenuFromBackend = async () => {

        try {

            const response = await sendChatMessage(
                "Mascotas"
            );

            console.log(response);

            if (response.type === "menu") {

                const buttons = response.buttons.map(button => {

                    if (button === "Agregar mascota") {
                        return {
                            label: button,
                            onClick: openAddPetFlowFromBackend
                        };
                    }

                    if (button === "Ver mascotas") {
                        return {
                            label: button,
                            onClick: getPets
                        };
                    }

                    if (button === "Menú principal") {
                        return {
                            label: button,
                            onClick: goToMainMenu
                        };
                    }

                    return {
                        label: button,
                        onClick: () => {}
                    };

                });

                setMessages(prev => [
                    ...prev,
                    {
                        role: "options",
                        text: response.text,
                        buttons
                    }
                ]);

            }

        } catch (error) {

            console.error(
                "Error abriendo menú mascotas:",
                error
            );

        }

    };


    const openAddPetFlowFromBackend = async () => {

        setMessages(prev => [
            ...prev,
            {
                role: "user",
                text: "Agregar mascota"
            }
        ]);

        const response = await sendChatMessage(
            "Agregar mascota"
        );

        if (response.type === "pet_flow") {

            setAiMode(true);
            setStep(response.step);

            setMessages(prev => [
                ...prev,
                {
                    role: "bot",
                    text: response.text
                }
            ]);
        }

    };

    const openMedicationsMenuFromBackend = async () => {

        const response = await sendChatMessage(
            "Medicamentos"
        );

        if (response.type === "menu") {

            const buttons = response.buttons.map(button => {

                if (button === "Agregar medicamento") {
                    return {
                        label: button,
                        onClick: startMedicationFlow
                    };
                }

                if (button === "Ver medicamentos") {
                    return {
                        label: button,
                        onClick: getMedications
                    };
                }

                if (button === "Menú principal") {
                    return {
                        label: button,
                        onClick: goToMainMenu
                    };
                }

                return {
                    label: button,
                    onClick: () => {}
                };
            });

            setMessages(prev => [
                ...prev,
                {
                    role: "options",
                    text: response.text,
                    buttons
                }
            ]);
        }
    };

    const openAppointmentsMenuFromBackend = async () => {

        try {

            const response = await sendChatMessage("Citas");

            console.log(response);

            if (response.type === "menu") {

                const buttons = response.buttons.map(button => {

                    if (button === "Agendar cita") {
                        return {
                            label: button,
                            onClick: startAppointmentFlow
                        };
                    }

                    if (button === "Ver citas") {
                        return {
                            label: button,
                            onClick: getAppointments
                        };
                    }

                    if (button === "Menú principal") {
                        return {
                            label: button,
                            onClick: goToMainMenu
                        };
                    }

                    return {
                        label: button,
                        onClick: () => {}
                    };
                });

                setMessages(prev => [
                    ...prev,
                    {
                        role: "options",
                        text: response.text,
                        buttons
                    }
                ]);
            }

        } catch (error) {
            console.error("Error abriendo menú citas:", error);
        }
    };


    const loadMainMenuFromBackend = async () => {

        try {

            const response = await sendChatMessage(
                "menu"
            );

            if (response.type === "menu") {

                const buttons = response.buttons.map(button => {

                    if (button === "Mascotas") {
                        return {
                            label: button,
                            onClick: async () => {
                                setMessages(prev => [
                                    ...prev,
                                    {
                                        role: "user",
                                        text: "Mascotas"
                                    }
                                ]);

                                await openPetsMenuFromBackend();
                            }
                        };
                    }

                    if (button === "Medicamentos") {
                        return {
                            label: button,
                            onClick: async () => {
                                setMessages(prev => [
                                    ...prev,
                                    {
                                        role: "user",
                                        text: "Medicamentos"
                                    }
                                ]);

                                await openMedicationsMenuFromBackend();
                            }
                        };
                    }

                    if (button === "Citas") {
                        return {
                            label: button,
                            onClick: async () => {
                                setMessages(prev => [
                                    ...prev,
                                    {
                                        role: "user",
                                        text: "Citas"
                                    }
                                ]);

                                await openAppointmentsMenuFromBackend();
                            }
                        };
                    }

                    return {
                        label: button,
                        onClick: () => {}
                    };

                });

                setMessages([
                    {
                        role: "options",
                        text: response.text,
                        buttons
                    }
                ]);

            }

        } catch (error) {

            console.error(
                "Error cargando menú principal:",
                error
            );

        }

    };

    const startPetFlow = () =>
        startPetConversation(
            setMessages,
            setAiMode,
            setStep,
            petRef
        );

    const startMedicationFlow = () =>
        startMedicationConversation(
            setMessages,
            selectPetForMedication
        );

    const startAppointmentFlow = () =>
        startAppointmentConversation(
            setMessages,
            selectPetForAppointment
        );

    const selectPetForMedication = (pet) =>
        selectPetForMedicationFlow(
            pet,
            medicationRef,
            setMedicationMode,
            setMedicationStep,
            setMessages
        );

    const selectPetForAppointment = (pet) =>
        selectPetForAppointmentFlow(
            pet,
            appointmentRef,
            setAppointmentMode,
            setAppointmentStep,
            setMessages
        );

    const sendMessage = () => {

        if (!input.trim()) return;

        const text = input.trim();

        setMessages(prev => [
            ...prev,
            {
                role: "user",
                text
            }
        ]);

        setInput("");

        const medicationHandled = handleMedicationFlow(
            text,
            medicationStep,
            medicationRef,
            setMedicationStep,
            setMessages,
            sendMedicationToAPI
        );

        if (medicationHandled) return;

        const appointmentHandled = handleAppointmentFlow(
            text,
            appointmentStep,
            appointmentRef,
            setAppointmentStep,
            setMessages,
            sendAppointmentToAPI
        );

        if (appointmentHandled) return;

        if (aiMode) {

            const handled = handlePetFlow(
                text,
                step,
                petRef,
                setStep,
                setMessages,
                setAiMode,
                sendToAPI
            );

            if (handled) return;
        }

        setMessages(prev => [
            ...prev,
            {
                role: "bot",
                text: "No entendí esa opción. Por favor selecciona una opción del menú."
            }
        ]);

        

        showMainMenu();

    };

    return (

        <div style={s.wrap}>

            <ChatHeader />

            <div style={s.body}>

                {messages.map((message, index) => (

                    <ChatMessage
                        key={index}
                        message={message}
                    />

                ))}

                <div ref={messagesEnd} />

            </div>

            <div style={s.inputArea}>

                <input
                    value={input}
                    onChange={(e) =>
                        setInput(e.target.value)
                    }
                    onKeyDown={(e) =>
                        e.key === "Enter" &&
                        sendMessage()
                    }
                    placeholder="Escribe aquí..."
                    style={s.input}
                />

                <button
                    style={s.sendBtn}
                    onClick={sendMessage}
                >
                    <Icon.Send />
                </button>

            </div>

        </div>

    );

}

export default ChatBox;