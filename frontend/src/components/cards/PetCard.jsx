import {
    Pencil,
    Trash2,
    Camera
} from "lucide-react";

import {
    useRef,
    useState
} from "react";

import { API_URL } from "../../api/axios";

function PetCard({
    pet,
    onEdit,
    onDelete,
    onUpdatePhoto
}) {

    const fileInputRef = useRef(null);

    const [previewImage, setPreviewImage] = useState(null);

    const handlePhotoClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {

        const file = e.target.files?.[0];

        if (!file) return;

        const imageUrl = URL.createObjectURL(file);

        setPreviewImage(imageUrl);

        onUpdatePhoto?.(pet, file);

    };

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

            <div
                className="
                    flex
                    flex-col
                    sm:flex-row
                    gap-4
                    items-center
                    sm:items-start
                "
            >

                <div className="relative shrink-0">

                    <img
                        src={
                            previewImage ||
                            (
                                pet.image_url
                                    ? `${API_URL}/${pet.image_url}`
                                    : "https://placehold.co/200x200?text=🐾"
                            )
                        }
                        alt={pet.name}
                        className="
                            w-20 h-20
                            sm:w-24 sm:h-24
                            rounded-2xl
                            object-cover
                            border-4
                            border-[#F0E6D9]
                            shadow-sm
                            transition-transform
                            duration-300
                            group-hover:scale-105
                        "
                    />

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />

                    <button
                        onClick={handlePhotoClick}
                        className="
                            absolute
                            -bottom-1
                            -right-1
                            w-8
                            h-8
                            rounded-full
                            bg-[#8B5E3C]
                            text-[#FAF6F1]
                            flex
                            items-center
                            justify-center
                            shadow-md
                            transition-all
                            duration-200
                            hover:bg-[#5A3419]
                            hover:scale-110
                        "
                        title="Actualizar foto"
                    >
                        <Camera size={14} />
                    </button>

                </div>

                <div
                    className="
                        flex-1
                        min-w-0
                        text-center
                        sm:text-left
                    "
                >

                    <h3
                        className="
                            text-base
                            sm:text-lg
                            font-bold
                            text-[#2C1810]
                            truncate
                        "
                    >
                        {pet.name}
                    </h3>

                    <p
                        className="
                            text-xs
                            text-[#A08070]
                            mb-3
                        "
                    >
                        Mascota registrada
                    </p>

                    <div
                        className="
                            flex
                            flex-wrap
                            gap-2
                            mb-4
                            justify-center
                            sm:justify-start
                        "
                    >

                        <span className="px-3 py-1 rounded-full bg-[#F0E6D9] text-[#6B3F1F] text-xs font-medium">
                            {pet.type}
                        </span>

                        <span className="px-3 py-1 rounded-full bg-[#F0E6D9] text-[#6B3F1F] text-xs font-medium">
                            {pet.breed}
                        </span>

                    </div>

                </div>

            </div>

            <div
                className="
                    flex
                    flex-col
                    sm:flex-row
                    gap-2
                    mt-4
                "
            >

                <button
                    onClick={() => onEdit(pet)}
                    className="
                        flex-1
                        flex
                        items-center
                        justify-center
                        gap-2
                        py-2.5
                        rounded-xl
                        bg-[#8B5E3C]
                        text-[#FAF6F1]
                        text-sm
                        font-semibold
                        transition-all
                        duration-200
                        hover:bg-[#5A3419]
                    "
                >
                    <Pencil size={14} />
                    Editar
                </button>

                <button
                    onClick={() => onDelete(pet)}
                    className="
                        flex-1
                        flex
                        items-center
                        justify-center
                        gap-2
                        py-2.5
                        rounded-xl
                        border
                        border-[#E8DDD3]
                        bg-[#F0E6D9]
                        text-[#9B6240]
                        text-sm
                        font-semibold
                        transition-all
                        duration-200
                        hover:bg-[#E8DDD3]
                        hover:text-[#6B3F1F]
                    "
                >
                    <Trash2 size={14} />
                    Eliminar
                </button>

            </div>

        </div>

    );

}

export default PetCard;