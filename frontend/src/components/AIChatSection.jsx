import { Bot, Send, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import api from "../api/axios";
import ReactMarkdown from "react-markdown";

function AIChatSection() {

    const [input, setInput] = useState("");

    const [messages, setMessages] = useState([
        {
            role: "bot",
            text: `👋 Hola, soy PetBot IA.

Puedo ayudarte con:

• Alimentación  
• Cuidados  
• Comportamiento  
• Medicamentos  
• Síntomas generales  

¿Qué deseas consultar?`
        }
    ]);

    // 🔽 AUTO SCROLL REF
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async () => {

        if (!input.trim()) return;

        const currentInput = input;

        const userMessage = {
            role: "user",
            text: currentInput
        };

        setMessages(prev => [...prev, userMessage]);

        setInput("");

        const loadingMessage = {
            role: "bot",
            text: "🐾 PetBot está escribiendo..."
        };

        setMessages(prev => [...prev, loadingMessage]);

        try {

            const response = await api.post("/ia/ask", {
                message: currentInput
            });

            const botMessage = {
                role: "bot",
                text: response.data.response || "No tengo respuesta en este momento 🐶"
            };

            setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = botMessage;
                return updated;
            });

        } catch (error) {

            const errorMessage = {
                role: "bot",
                text: "⚠️ Error conectando con PetBot IA"
            };

            setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = errorMessage;
                return updated;
            });
        }
    };

    return (

        <div className="
            flex
            flex-col
            h-[92vh]
            bg-white
            rounded-[20px]
            overflow-hidden
            border
            border-[#E8DDD3]
        ">

            {/* HEADER */}
            <div className="
                flex
                items-center
                gap-3
                px-5
                py-4
                border-b
                border-[#E8DDD3]
                bg-white
            ">

                <div className="
                    w-10
                    h-10
                    rounded-full
                    bg-[#F0E6D9]
                    border
                    border-[#E8DDD3]
                    flex
                    items-center
                    justify-center
                ">
                    <Bot size={20} className="text-[#9B6240]" />
                </div>

                <div>
                    <h2 className="text-sm font-bold text-[#2C1810]">
                        PetBot IA
                    </h2>
                    <p className="text-xs text-[#A08070]">
                        Especialista en mascotas
                    </p>
                </div>

                <div className="ml-auto w-2 h-2 rounded-full bg-[#5A8A5A]" />
            </div>

            {/* BODY */}
            <div className="
                flex-1
                overflow-y-auto
                bg-[#FAF6F1]
                p-4
                flex
                flex-col
                gap-3
            ">

                {messages.map((message, index) => (

                    <div
                        key={index}
                        className={
                            message.role === "user"
                                ? "flex justify-end"
                                : "flex gap-2"
                        }
                    >

                        {message.role === "bot" && (
                            <div className="
                                w-7
                                h-7
                                rounded-full
                                bg-[#F0E6D9]
                                border
                                border-[#E8DDD3]
                                flex
                                items-center
                                justify-center
                                shrink-0
                            ">
                                <Bot size={14} className="text-[#9B6240]" />
                            </div>
                        )}

                        {/* MENSAJE */}
                        <div
                            className={
                                message.role === "user"
                                    ? `
                                        bg-[#6B3F1F]
                                        text-white
                                        px-4
                                        py-3
                                        rounded-[16px]
                                        rounded-br-[4px]
                                        max-w-[70%]
                                    `
                                    : `
                                        bg-white
                                        border
                                        border-[#E8DDD3]
                                        text-[#2C1810]
                                        px-4
                                        py-3
                                        rounded-[16px]
                                        rounded-bl-[4px]
                                        max-w-[70%]
                                    `
                            }
                        >

                            <ReactMarkdown>
                                {message.text}
                            </ReactMarkdown>

                        </div>

                        {message.role === "user" && (
                            <div className="
                                ml-2
                                w-7
                                h-7
                                rounded-full
                                bg-[#6B3F1F]
                                flex
                                items-center
                                justify-center
                                shrink-0
                            ">
                                <User size={14} className="text-white" />
                            </div>
                        )}

                    </div>
                ))}

                <div ref={messagesEndRef} />
            </div>

            {/* INPUT */}
            <div className="
                flex
                items-center
                gap-2
                p-3
                bg-white
                border-t
                border-[#E8DDD3]
            ">

                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Pregunta algo sobre tus mascotas..."
                    className="
                        flex-1
                        rounded-full
                        border
                        border-[#E8DDD3]
                        bg-[#FAF6F1]
                        px-4
                        py-2
                        outline-none
                    "
                />

                <button
                    onClick={sendMessage}
                    className="
                        w-10
                        h-10
                        rounded-full
                        bg-[#6B3F1F]
                        text-white
                        flex
                        items-center
                        justify-center
                        hover:bg-[#5A3419]
                    "
                >
                    <Send size={18} />
                </button>

            </div>

        </div>
    );
}

export default AIChatSection;