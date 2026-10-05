import { useEffect, useState } from "react";

import AppointmentCard from "../cards/AppointmentCard";
import EditAppointmentModal from "../modals/EditAppointmentModal";
import ConfirmDeleteModal from "../modals/ConfirmDeleteModal";
import SectionHeader from "./SectionHeader";
import { Calendar } from "lucide-react";

import {
    getAppointments,
    deleteAppointment,
    updateAppointment
} from "../../services/appointmentService";

import toast from "react-hot-toast";

function AppointmentsSection() {

    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedAppointment, setSelectedAppointment] = useState(null);

    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [updating, setUpdating] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        loadAppointments();
    }, []);

    const loadAppointments = async () => {

        try {

            const data = await getAppointments();

            setAppointments(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }
    };


    const handleEdit = (appointment) => {

        setSelectedAppointment(appointment);
        setShowEditModal(true);

    };

    const handleDelete = (appointment) => {

        setSelectedAppointment(appointment);
        setShowDeleteModal(true);

    };

    const confirmDeleteAppointment = async () => {

        if (!selectedAppointment) return;

        try {

            setDeleting(true);

            await deleteAppointment(selectedAppointment.id);

            setAppointments(prev =>
                prev.filter(
                    item => item.id !== selectedAppointment.id
                )
            );

            toast.success(
                "Cita eliminada correctamente"
            );

            setShowDeleteModal(false);
            setSelectedAppointment(null);

        } catch (error) {

            console.error(error);

            toast.error(
                "No se pudo eliminar la cita"
            );

        } finally {

            setDeleting(false);

        }
    };


    const handleUpdateAppointment = async (
        appointmentData
    ) => {

        if (
            !appointmentData.date?.trim() ||
            !appointmentData.time?.trim() ||
            !appointmentData.reason?.trim()
        ) {

            toast.error(
                "Todos los campos son obligatorios"
            );

            return;
        }

        try {

            setUpdating(true);

            const response = await updateAppointment(
                appointmentData.id,
                {
                    date: appointmentData.date,
                    time: appointmentData.time,
                    reason: appointmentData.reason,
                    pet_id: selectedAppointment.pet_id
                }
            );

            if (response.status === 200) {

                setAppointments(prev =>
                    prev.map(item =>
                        item.id === appointmentData.id
                            ? {
                                ...item,
                                date: appointmentData.date,
                                time: appointmentData.time,
                                reason: appointmentData.reason
                            }
                            : item
                    )
                );

                toast.success(
                    response.message ||
                    "Cita actualizada correctamente"
                );

                setShowEditModal(false);
                setSelectedAppointment(null);
            }

        } catch (error) {

            console.error(error);

            toast.error(
                error?.response?.data?.message ||
                "No se pudo actualizar la cita"
            );

        } finally {

            setUpdating(false);

        }
    };


    if (loading) {

        return (
            <p className="text-[#8B6F5A]">
                Cargando citas...
            </p>
        );
    }

    return (
        <>

            <div>

                <SectionHeader
                    title="Mis citas"
                    subtitle="Agenda de visitas veterinarias"
                    icon={Calendar}
                />

                {appointments.length === 0 ? (

                    <div
                        className="
                            bg-white
                            border
                            border-[#E8DDD3]
                            rounded-2xl
                            p-6
                            text-center
                            text-[#8B6F5A]
                        "
                    >
                        No tienes citas registradas.
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

                        {appointments.map((appointment) => (

                            <AppointmentCard
                                key={appointment.id}
                                appointment={appointment}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />

                        ))}

                    </div>

                )}

            </div>

            {/* MODAL EDITAR */}

            <EditAppointmentModal
                isOpen={showEditModal}
                appointment={selectedAppointment}
                onSave={handleUpdateAppointment}
                onClose={() => {

                    setShowEditModal(false);
                    setSelectedAppointment(null);

                }}
                loading={updating}
            />

            {/* MODAL ELIMINAR */}

            <ConfirmDeleteModal
                isOpen={showDeleteModal}
                title="Eliminar cita"
                message={`¿Deseas eliminar esta cita?

Esta acción no se puede deshacer.`}
                onConfirm={confirmDeleteAppointment}
                onCancel={() => {

                    setShowDeleteModal(false);
                    setSelectedAppointment(null);

                }}
                loading={deleting}
            />

        </>
    );
}

export default AppointmentsSection;