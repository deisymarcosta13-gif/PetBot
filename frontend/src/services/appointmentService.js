import api from "../api/axios";

export const createAppointment = async (appointmentData) => {

    const token = localStorage.getItem("token");

    const response = await api.post(
        "/appointments/create_appointment",
        appointmentData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const getAppointments = async () => {

    const token = localStorage.getItem("token");

    const response = await api.get(
        "/appointments/list_user_appointments",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data.appointments;
};

export const updateAppointment = async (
    id,
    appointmentData
) => {

    const token = localStorage.getItem("token");

    const response = await api.put(
        `/appointments/update_appointment/${id}`,
        appointmentData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const deleteAppointment = async (id) => {

    const token = localStorage.getItem("token");

    const response = await api.delete(
        `/appointments/delete_appointment/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};