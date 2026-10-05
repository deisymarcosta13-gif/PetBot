import { AlertTriangle } from "lucide-react";

function ConfirmDeleteModal({
    isOpen,
    title,
    message,
    onConfirm,
    onCancel,
    loading = false
}) {

    if (!isOpen) return null;

    return (

        <div
            className="
                fixed inset-0
                z-50
                flex items-center justify-center
                bg-black/40
                backdrop-blur-sm
                p-4
            "
        >

            <div
                className="
                    w-full
                    max-w-md
                    bg-white
                    rounded-3xl
                    p-6
                    shadow-2xl
                    border border-[#E8DDD3]
                    animate-in
                    fade-in
                    zoom-in-95
                    duration-200
                "
            >

                {/* ICONO */}
                <div
                    className="
                        w-14
                        h-14
                        rounded-2xl
                        bg-[#F8F2EC]
                        flex
                        items-center
                        justify-center
                        mx-auto
                        mb-4
                    "
                >
                    <AlertTriangle
                        size={28}
                        className="text-[#8B5E3C]"
                    />
                </div>

                {/* TITULO */}
                <h2
                    className="
                        text-xl
                        font-bold
                        text-[#2C1810]
                        text-center
                    "
                >
                    {title}
                </h2>

                {/* MENSAJE */}
                <p
                    className="
                        mt-3
                        text-[#8B6F5A]
                        text-center
                        leading-relaxed
                    "
                >
                    {message}
                </p>

                {/* BOTONES */}
                <div
                    className="
                        flex
                        flex-col
                        sm:flex-row
                        gap-3
                        mt-6
                    "
                >

                    <button
                        onClick={onCancel}
                        disabled={loading}
                        className="
                            flex-1
                            py-3
                            rounded-xl
                            bg-[#F0E6D9]
                            text-[#6B3F1F]
                            font-semibold
                            transition-all
                            duration-200
                            hover:bg-[#E8DDD3]
                            hover:scale-[1.02]
                            active:scale-95
                            disabled:opacity-50
                        "
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="
                            flex-1
                            py-3
                            rounded-xl
                            bg-[#8B5E3C]
                            text-[#FAF6F1]
                            font-semibold
                            transition-all
                            duration-200
                            hover:bg-[#5A3419]
                            hover:scale-[1.02]
                            hover:shadow-lg
                            active:scale-95
                            disabled:opacity-50
                        "
                    >
                        {loading
                            ? "Eliminando..."
                            : "Eliminar"}
                    </button>

                </div>

            </div>

        </div>

    );
}

export default ConfirmDeleteModal;