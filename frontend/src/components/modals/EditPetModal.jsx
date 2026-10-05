import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function EditPetModal({
    isOpen,
    pet,
    onSave,
    onClose,
    loading = false
}) {

    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [breed, setBreed] = useState("");

    useEffect(() => {

        if (pet) {

            setName(pet.name || "");
            setType(pet.type || "");
            setBreed(pet.breed || "");

        }

    }, [pet]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {

        e.preventDefault();

        if (
            !name.trim() ||
            !type.trim() ||
            !breed.trim()
        ) {
            toast.error(
                "Todos los campos son obligatorios"
            );
            return;
        }

        onSave({
            id: pet.id,
            name,
            type,
            breed
        });

    };

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
                    max-w-lg
                    bg-white
                    rounded-3xl
                    shadow-xl
                    overflow-hidden
                "
            >

                {/* HEADER */}
                <div
                    className="
                        px-6
                        py-5
                        border-b
                        border-[#F0E6D9]
                    "
                >
                    <h2
                        className="
                            text-xl
                            font-bold
                            text-[#2C1810]
                        "
                    >
                        Editar mascota
                    </h2>

                    <p
                        className="
                            text-sm
                            text-[#8B6F5A]
                            mt-1
                        "
                    >
                        Actualiza la información de tu mascota.
                    </p>
                </div>

                {/* FORM */}
                <form
                    onSubmit={handleSubmit}
                    className="p-6"
                >

                    <div className="space-y-4">

                        {/* NOMBRE */}
                        <div>

                            <label
                                className="
                                    block
                                    text-sm
                                    font-semibold
                                    text-[#5C4033]
                                    mb-2
                                "
                            >
                                Nombre
                            </label>

                            <input
                                type="text"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
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
                            />

                        </div>

                        {/* TIPO */}
                        <div>

                            <label
                                className="
                                    block
                                    text-sm
                                    font-semibold
                                    text-[#5C4033]
                                    mb-2
                                "
                            >
                                Tipo
                            </label>

                            <input
                                type="text"
                                value={type}
                                onChange={(e) =>
                                    setType(e.target.value)
                                }
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
                            />

                        </div>

                        {/* RAZA */}
                        <div>

                            <label
                                className="
                                    block
                                    text-sm
                                    font-semibold
                                    text-[#5C4033]
                                    mb-2
                                "
                            >
                                Raza
                            </label>

                            <input
                                type="text"
                                value={breed}
                                onChange={(e) =>
                                    setBreed(e.target.value)
                                }
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
                            />

                        </div>

                    </div>

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
                            type="button"
                            onClick={onClose}
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
                            "
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
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
                                hover:shadow-md
                            "
                        >
                            {loading
                                ? "Guardando..."
                                : "Guardar cambios"}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default EditPetModal;