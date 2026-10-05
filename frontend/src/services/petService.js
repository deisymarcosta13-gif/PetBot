import api from "../api/axios";

export const createPet = async (petData) => {

    const token = localStorage.getItem("token");

    const response = await api.post(
        "/pets/create_pet",
        petData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;

};

export const getPets = async () => {

    const token = localStorage.getItem("token");

    const response = await api.get(
        "/pets/list_user_pets",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data.pets;

};

export const updatePet = async (id, petData) => {

    const token = localStorage.getItem("token");

    const response = await api.put(
        `/pets/update_pet/${id}`,
        petData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;

};

export const uploadPetImage = async (id, file) => {

    const token = localStorage.getItem("token");

    const formData = new FormData();

    formData.append("image", file);

    const response = await api.put(
        `/pets/update_pet_image/${id}/image`,
        formData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        }
    );

    return response.data;

};

export const deletePet = async (id) => {

    const token = localStorage.getItem("token");

    const response = await api.delete(
        `/pets/delete_pet/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;

};