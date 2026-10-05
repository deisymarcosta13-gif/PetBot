import { useEffect, useState } from "react";

import MedicationCard from "../cards/MedicationCard";
import EditMedicationModal from "../modals/EditMedicationModal";
import ConfirmDeleteModal from "../modals/ConfirmDeleteModal";
import SectionHeader from "./SectionHeader";
import { Pill } from "lucide-react";

import {
    getMedications,
    deleteMedication,
    updateMedication
} from "../../services/medicationService";

import toast from "react-hot-toast";

function MedicationsSection() {

    const [medications, setMedications] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedMedication, setSelectedMedication] = useState(null);

    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [updating, setUpdating] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        loadMedications();
    }, []);

    const loadMedications = async () => {
        try {
            const data = await getMedications();
            setMedications(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // ================= EDITAR =================
    const handleEdit = (medication) => {
        setSelectedMedication(medication);
        setShowEditModal(true);
    };

    const handleDelete = (medication) => {
        setSelectedMedication(medication);
        setShowDeleteModal(true);
    };

    const confirmDeleteMedication = async () => {

        if (!selectedMedication) return;

        try {
            setDeleting(true);

            await deleteMedication(selectedMedication.id);

            setMedications(prev =>
                prev.filter(item => item.id !== selectedMedication.id)
            );

            toast.success("Medicamento eliminado correctamente");

            setShowDeleteModal(false);
            setSelectedMedication(null);

        } catch (error) {

            console.error(error);
            toast.error("No se pudo eliminar el medicamento");

        } finally {
            setDeleting(false);
        }
    };

    const handleUpdateMedication = async (medicationData) => {

        if (
            !medicationData.name?.trim() ||
            !medicationData.dosage?.trim() ||
            !medicationData.frequency?.trim()
        ) {
            toast.error("Todos los campos son obligatorios");
            return;
        }

        try {
            setUpdating(true);

            const response = await updateMedication(
                medicationData.id,
                {
                    name: medicationData.name,
                    dosage: medicationData.dosage,
                    frequency: medicationData.frequency,
                    pet_id: selectedMedication.pet_id
                }
            );

            if (response.status === 200) {

                setMedications(prev =>
                    prev.map(item =>
                        item.id === medicationData.id
                            ? {
                                ...item,
                                name: medicationData.name,
                                dosage: medicationData.dosage,
                                frequency: medicationData.frequency
                            }
                            : item
                    )
                );

                toast.success(
                    response.message || "Medicamento actualizado correctamente"
                );

                setShowEditModal(false);
                setSelectedMedication(null);
            }

        } catch (error) {

            console.error(error);

            toast.error(
                error?.response?.data?.message ||
                "No se pudo actualizar el medicamento"
            );

        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <p className="text-[#8B6F5A]">
                Cargando medicamentos...
            </p>
        );
    }

    return (
        <>

            <div>

                <SectionHeader
                    title="Medicamentos"
                    subtitle="Control de tratamientos y dosis"
                    icon={Pill}
                />

                {medications.length === 0 ? (

                    <div className="bg-white border border-[#E8DDD3] rounded-2xl p-6 text-center text-[#8B6F5A]">
                        No tienes medicamentos registrados.
                    </div>

                ) : (

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

                        {medications.map((medication) => (

                            <MedicationCard
                                key={medication.id}
                                medication={medication}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />

                        ))}

                    </div>

                )}

            </div>

            {/* MODAL EDITAR */}
            <EditMedicationModal
                isOpen={showEditModal}
                medication={selectedMedication}
                onSave={handleUpdateMedication}
                onClose={() => {
                    setShowEditModal(false);
                    setSelectedMedication(null);
                }}
                loading={updating}
            />

            {/* MODAL ELIMINAR */}
            <ConfirmDeleteModal
                isOpen={showDeleteModal}
                title="Eliminar medicamento"
                message={`¿Deseas eliminar ${selectedMedication?.name}?

Esta acción no se puede deshacer.`}
                onConfirm={confirmDeleteMedication}
                onCancel={() => {
                    setShowDeleteModal(false);
                    setSelectedMedication(null);
                }}
                loading={deleting}
            />

        </>
    );
}

export default MedicationsSection;