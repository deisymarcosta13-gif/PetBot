import api from "../api/axios";

export const createMedication = async (medicationData) => {

    const token = localStorage.getItem("token");

    const response = await api.post(
        "/medications/create_medication",
        medicationData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const getMedications = async () => {

    const token = localStorage.getItem("token");

    const response = await api.get(
        "/medications/list_user_medications",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data.medications;
};

export const updateMedication = async (id, data) => {

    const token = localStorage.getItem("token");

    const response = await api.put(
        `/medications/update_medication/${id}`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const deleteMedication = async (id) => {

    const token = localStorage.getItem("token");

    const response = await api.delete(
        `/medications/delete_medication/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};