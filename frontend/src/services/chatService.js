import api from "../api/axios";

export const sendChatMessage = async (message) => {

    const token = localStorage.getItem("token");

    const response = await api.post(
        "/chat/message",
        {
            message
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;

};