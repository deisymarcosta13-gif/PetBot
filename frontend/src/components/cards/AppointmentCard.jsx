import {
    Pencil,
    Trash2,
    Calendar,
    Clock
} from "lucide-react";

function AppointmentCard({
    appointment,
    onEdit,
    onDelete
}) {

    return (

        <div
            className="
                group
                bg-white
                border border-[#E8DDD3]
                rounded-3xl
                p-4
                shadow-sm
                hover:shadow-lg
                hover:border-[#DCCABD]
                hover:scale-[1.01]
                transition-all
                duration-300
                w-full
                overflow-hidden
            "
        >

            <div className="flex items-start gap-3 sm:gap-4">

                {/* ICONO */}
                <div
                    className="
                        shrink-0
                        w-12 h-12
                        sm:w-14 sm:h-14
                        rounded-2xl
                        bg-[#F0E6D9]
                        flex
                        items-center
                        justify-center
                    "
                >
                    <Calendar
                        size={24}
                        className="text-[#8B5E3C]"
                    />
                </div>

                {/* INFO */}
                <div className="flex-1 min-w-0">

                    <div className="flex flex-col gap-1">

                        <h3
                            className="
                                text-base
                                sm:text-lg
                                font-bold
                                text-[#2C1810]
                                truncate
                            "
                        >
                            {appointment.reason}
                        </h3>

                        <p
                            className="
                                text-xs
                                sm:text-sm
                                text-[#8B6F5A]
                                truncate
                            "
                        >
                            {appointment.pet_name || "Mascota"}
                        </p>

                    </div>

                    {/* FECHA Y HORA */}
                    <div className="flex flex-wrap gap-2 mt-3">

                        <span className="
                            px-3 py-1 rounded-full
                            bg-[#F8F2EC]
                            text-[#6B3F1F]
                            text-xs font-medium
                        ">
                            {appointment.date}
                        </span>

                        <span className="
                            px-3 py-1 rounded-full
                            bg-[#F8F2EC]
                            text-[#6B3F1F]
                            text-xs font-medium
                            flex items-center gap-1
                        ">
                            <Clock size={12} />
                            {appointment.time}
                        </span>

                    </div>

                </div>

            </div>

            {/* BOTONES */}
            <div className="flex flex-col sm:flex-row gap-2 mt-4">

                <button
                    onClick={() => onEdit?.(appointment)}
                    className="
                        flex-1
                        flex items-center justify-center gap-2
                        py-2.5 rounded-xl
                        bg-[#8B5E3C]
                        text-[#FAF6F1]
                        text-sm font-semibold
                        transition-all duration-200
                        hover:bg-[#5A3419]
                    "
                >
                    <Pencil size={14} />
                    Editar
                </button>

                <button
                    onClick={() => onDelete?.(appointment)}
                    className="
                        flex-1
                        flex items-center justify-center gap-2
                        py-2.5 rounded-xl
                        border border-[#E8DDD3]
                        bg-[#F8F2EC]
                        text-[#9B6240]
                        text-sm font-semibold
                        transition-all duration-200
                        hover:bg-[#EFE6DD]
                    "
                >
                    <Trash2 size={14} />
                    Eliminar
                </button>

            </div>

        </div>

    );
}

export default AppointmentCard;