import api from "../api/axios";

export const registerUser = async (userData) => {
    const response = await api.post(
        "/auth/register",
        userData
    );

    return response.data;
};

export const loginUser = async (data) => {
    const response = await api.post(
        "/auth/login",
        data
    );

    return response.data;
};