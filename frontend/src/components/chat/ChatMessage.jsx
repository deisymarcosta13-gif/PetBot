import { Icon } from "../../icons/chatIcons";
import { s } from "../../styles/chatStyles";

import PetCard from "./PetCard";
import MedicationCard from "./MedicationCard";
import AppointmentCard from "./AppointmentCard";

import {
    PawPrint,
    CalendarDays,
    Pill,
    Bot,
    UserRound
} from "lucide-react";

function ChatMessage({ message }) {

    if (message.role === "options") {

        return (

            <div style={s.rowBot}>

                <div style={s.avatarBot}>
                    <Icon.Bot />
                </div>

                <div
                    style={{
                        ...s.bubbleBot,
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px"
                    }}
                >

                    <div>
                        {message.text}
                    </div>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px"
                        }}
                    >

                        {message.buttons.map((button, index) => (

                            <button
                                key={index}
                                style={s.btnSecondary}
                                onClick={button.onClick}
                            >
                                {button.label}
                            </button>

                        ))}

                    </div>

                </div>

            </div>

        );

    }

    if (message.role === "pet-selector") {

        return (

            <div style={s.rowBot}>

                <div style={s.avatarBot}>
                    <Icon.Bot />
                </div>

                <div
                    style={{
                        ...s.bubbleBot,
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px"
                    }}
                >

                    <div>
                        {message.text}
                    </div>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px"
                        }}
                    >

                        {message.pets.map((pet) => (

                            <button
                                key={pet.id}
                                style={s.btnSecondary}
                                onClick={() => message.onSelect(pet)}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px"
                                    }}
                                >
                                    <PawPrint size={16} />
                                    {pet.name}
                                </div>
                            </button>

                        ))}

                    </div>

                </div>

            </div>

        );

    }

    if (message.role === "pets") {

        return (

            <div style={s.rowBot}>

                <div style={s.avatarBot}>
                    <Icon.Bot />
                </div>

                <div
                    style={{
                        ...s.bubbleBot,
                        width: "100%",
                        maxWidth: "420px"
                    }}
                >

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            fontWeight: "600",
                            marginBottom: "12px",
                            color: "#5D4037"
                        }}
                    >
                        <PawPrint size={18} />
                        Tus mascotas
                    </div>

                    {message.pets.map((pet) => (

                        <PetCard
                            key={pet.id}
                            pet={pet}
                        />

                    ))}

                </div>

            </div>

        );

    }

    if (message.role === "medications") {

        return (

            <div style={s.rowBot}>

                <div style={s.avatarBot}>
                    <Icon.Bot />
                </div>

                <div
                    style={{
                        ...s.bubbleBot,
                        width: "100%",
                        maxWidth: "420px"
                    }}
                >

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            fontWeight: "600",
                            marginBottom: "12px",
                            color: "#5D4037"
                        }}
                    >
                        <Pill size={18} />
                        Tus medicamentos
                    </div>
                    {message.medications.map((medication) => (

                        <MedicationCard
                            key={medication.id}
                            medication={medication}
                        />

                    ))}

                </div>

            </div>

        );

    }

    if (message.role === "appointments") {

        return (

            <div style={s.rowBot}>

                <div style={s.avatarBot}>
                    <Icon.Bot />
                </div>

                <div
                    style={{
                        ...s.bubbleBot,
                        width: "100%",
                        maxWidth: "420px"
                    }}
                >

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            fontWeight: "600",
                            marginBottom: "12px",
                            color: "#5D4037"
                        }}
                    >
                        <CalendarDays size={18} />
                        Tus citas
                    </div>

                    {message.appointments.map((appointment) => (

                        <AppointmentCard
                            key={appointment.id}
                            appointment={appointment}
                        />

                    ))}

                </div>

            </div>

        );

    }

    return (

        <div
            style={
                message.role === "user"
                    ? s.rowUser
                    : s.rowBot
            }
        >

            <div
                style={
                    message.role === "user"
                        ? s.avatarUser
                        : s.avatarBot
                }
            >
                {
                    message.role === "user"
                        ? <UserRound size={16} />
                        : <Bot size={16} />
                }
            </div>

            <div
                style={
                    message.role === "user"
                        ? s.bubbleUser
                        : s.bubbleBot
                }
            >
                {message.text}
            </div>

        </div>

    );

}

export default ChatMessage;