import { Icon } from "../../icons/chatIcons";
import { s } from "../../styles/chatStyles";

function ChatHeader() {
    return (
        <div style={s.header}>

            <div style={s.headerAvatar}>
                <Icon.Paw />
            </div>

            <div>
                <div style={s.headerTitle}>
                    PetBot
                </div>

                <div style={s.headerSub}>
                    Asistente para mascotas
                </div>
            </div>

            <div style={s.onlineDot} />

        </div>
    );
}

export default ChatHeader;