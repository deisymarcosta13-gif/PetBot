import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function EditAppointmentModal({
    isOpen,
    appointment,
    onSave,
    onClose,
    loading = false
}) {

    const [date, setDate] = useState(null);
    const [time, setTime] = useState("");
    const [reason, setReason] = useState("");

    useEffect(() => {
        if (appointment) {
            setDate(appointment.date ? new Date(appointment.date) : null);
            setTime(appointment.time || "");
            setReason(appointment.reason || "");
        }
    }, [appointment]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!date || !time.trim() || !reason.trim()) {
            toast.error("Todos los campos son obligatorios");
            return;
        }

        onSave({
            id: appointment.id,
            date: date.toISOString().split("T")[0],
            time,
            reason
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">

            <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl overflow-hidden">

                {/* HEADER */}
                <div className="px-6 py-5 border-b border-[#F0E6D9]">
                    <h2 className="text-xl font-bold text-[#2C1810]">
                        Editar cita
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">

                    {/* FECHA (DATE PICKER) */}
                    <div>
                        <label className="block text-sm font-semibold text-[#5C4033] mb-2">
                            Fecha
                        </label>

                        <div className="w-full">
                            <DatePicker
                                selected={date}
                                onChange={(d) => setDate(d)}
                                minDate={new Date()}
                                dateFormat="yyyy-MM-dd"
                                className="
                                    w-full
                                    px-4
                                    py-3
                                    rounded-xl
                                    border
                                    border-[#E8DDD3]
                                    bg-[#FAF6F1]
                                    outline-none
                                    focus:border-[#8B5E3C]
                                    focus:ring-2
                                    focus:ring-[#E8DDD3]
                                "
                                wrapperClassName="w-full"
                            />
                        </div>
                    </div>

                    {/* HORA */}
                    <div>
                        <label className="block text-sm font-semibold text-[#5C4033] mb-2">
                            Hora
                        </label>

                        <input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-[#E8DDD3] bg-[#FAF6F1]"
                        />
                    </div>

                    {/* MOTIVO */}
                    <div>
                        <label className="block text-sm font-semibold text-[#5C4033] mb-2">
                            Motivo
                        </label>

                        <input
                            type="text"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-[#E8DDD3] bg-[#FAF6F1]"
                        />
                    </div>

                    {/* BOTONES */}
                    <div className="flex gap-3 pt-4">

                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 rounded-xl bg-[#F0E6D9]"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 py-3 rounded-xl bg-[#8B5E3C] text-white"
                        >
                            Guardar
                        </button>

                    </div>

                </form>

            </div>
        </div>
    );
}

export default EditAppointmentModal;