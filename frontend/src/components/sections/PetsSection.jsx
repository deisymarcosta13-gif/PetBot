import { useEffect, useState } from "react";

import PetCard from "../cards/PetCard";
import ConfirmDeleteModal from "../modals/ConfirmDeleteModal";
import EditPetModal from "../modals/EditPetModal";
import SectionHeader from "./SectionHeader";
import { PawPrint } from "lucide-react";

import {
    getPets,
    deletePet,
    updatePet,
    uploadPetImage
} from "../../services/petService";

import toast from "react-hot-toast";

function PetsSection() {

    const [pets, setPets] = useState([]);

    const [selectedPet, setSelectedPet] = useState(null);

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [showEditModal, setShowEditModal] = useState(false);

    const [updating, setUpdating] = useState(false);

    const [deleting, setDeleting] = useState(false);

    useEffect(() => {

        loadPets();

    }, []);

    const loadPets = async () => {

        try {

            const data = await getPets();

            setPets(data);

        } catch (error) {

            console.error(error);

        }

    };

    const handleEdit = (pet) => {

        setSelectedPet(pet);

        setShowEditModal(true);

    };

    const handleDelete = (pet) => {

        setSelectedPet(pet);

        setShowDeleteModal(true);

    };

    const confirmDeletePet = async () => {

        if (!selectedPet) return;

        try {

            setDeleting(true);

            await deletePet(selectedPet.id);

            setPets(prevPets =>
                prevPets.filter(
                    item => item.id !== selectedPet.id
                )
            );

            toast.success(
                `${selectedPet.name} fue eliminado correctamente`
            );

            setShowDeleteModal(false);

            setSelectedPet(null);

        } catch (error) {

            console.error(error);

            toast.error(
                "No se pudo eliminar la mascota"
            );

        } finally {

            setDeleting(false);

        }

    };

    const handleUpdatePet = async (petData) => {

        try {

            setUpdating(true);

            const response = await updatePet(
                petData.id,
                {
                    name: petData.name,
                    type: petData.type,
                    breed: petData.breed
                }
            );

            if (response.status === 200) {

                if (
                    response.message ===
                    "No hubo cambios para actualizar"
                ) {

                    toast(
                        "No realizaste cambios"
                    );

                    return;

                }

                setPets(prevPets =>
                    prevPets.map(item =>
                        item.id === petData.id
                            ? {
                                ...item,
                                name: petData.name,
                                type: petData.type,
                                breed: petData.breed
                            }
                            : item
                    )
                );

                toast.success(
                    response.message ||
                    "Mascota actualizada correctamente"
                );

                setShowEditModal(false);

                setSelectedPet(null);

            }

        } catch (error) {

            console.error(error);

            toast.error(
                error?.response?.data?.message ||
                "No se pudo actualizar la mascota"
            );

        } finally {

            setUpdating(false);

        }

    };

    const handleUpdatePhoto = async (pet, file) => {

        try {

            const response = await uploadPetImage(
                pet.id,
                file
            );

            setPets(prev =>
                prev.map(item =>
                    item.id === pet.id
                        ? {
                            ...item,
                            image_url: response.image_url
                        }
                        : item
                )
            );

            toast.success(
                "Foto actualizada correctamente"
            );

        } catch (error) {

            console.error(error);

            toast.error(
                "No se pudo actualizar la foto"
            );

        }

    };

    return (

        <>

            <div>

                <SectionHeader
                    title="Mis mascotas"
                    subtitle="Gestiona la información de tus compañeros"
                    icon={PawPrint}
                />

                {pets.length === 0 ? (

                    <div className="bg-white border border-[#E8DDD3] rounded-2xl p-6 text-center text-[#8B6F5A]">
                        No tienes mascotas registradas.
                    </div>

                ) : (

                    <div
                        className="
                            grid
                            grid-cols-1
                            md:grid-cols-2
                            xl:grid-cols-3
                            gap-4
                        "
                    >

                        {pets.map((pet) => (

                            <PetCard
                                key={pet.id}
                                pet={pet}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                onUpdatePhoto={handleUpdatePhoto}
                            />

                        ))}

                    </div>

                )}

            </div>

            <ConfirmDeleteModal
                isOpen={showDeleteModal}
                title="Eliminar mascota"
                message={`¿Deseas eliminar a ${selectedPet?.name}?

            También se eliminarán todas las citas y medicamentos asociados a esta mascota.

            Esta acción no se puede deshacer.`}
                onConfirm={confirmDeletePet}
                onCancel={() => {
                    setShowDeleteModal(false);
                    setSelectedPet(null);
                }}
                loading={deleting}
            />

            <EditPetModal
                isOpen={showEditModal}
                pet={selectedPet}
                onSave={handleUpdatePet}
                onClose={() => {

                    setShowEditModal(false);

                    setSelectedPet(null);

                }}
                loading={updating}
            />

        </>

    );

}

export default PetsSection;