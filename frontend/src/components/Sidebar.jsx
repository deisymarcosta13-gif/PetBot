import {
    PawPrint,
    Calendar,
    Pill,
    Bot,
    Sparkles,
    LogOut,
    X,
    Heart,
    ShieldPlus
} from "lucide-react";

import petbotLogo from "../assets/images/petbot.png";

function Sidebar({
    section,
    setSection,
    isOpen,
    setIsOpen
}) {

    const menuItems = [
        {
            id: "chat",
            label: "Chat",
            icon: Bot
        },
        {
            id: "ai-chat",
            label: "Chat IA",
            icon: Sparkles
        },
        {
            id: "pets",
            label: "Mascotas",
            icon: PawPrint
        },
        {
            id: "appointments",
            label: "Citas",
            icon: Calendar
        },
        {
            id: "meds",
            label: "Medicamentos",
            icon: Pill
        }
    ];

    const handleChange = (value) => {
        setSection(value);
        setIsOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside
                className={`
                    fixed md:sticky top-0
                    z-50
                    h-screen w-64
                    bg-gradient-to-b
                    from-[#FFFDFB]
                    via-[#FAF7F4]
                    to-[#F5EDE4]
                    border-r border-[#E5DDD5]
                    shadow-lg
                    flex flex-col
                    overflow-y-auto
                    transition-transform duration-300

                    ${isOpen
                        ? "translate-x-0"
                        : "-translate-x-full md:translate-x-0"
                    }
                `}
            >

                {/* HEADER */}
                <div className="relative p-4 border-b border-[#E5DDD5]">

                    <div className="flex justify-end md:hidden">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-[#5C4033]"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="flex flex-col items-center">

                        <div className="
                            w-16 h-16
                            rounded-full
                            overflow-hidden
                            bg-white
                            shadow-lg
                            border-2 border-[#FFE8D2]
                        ">
                            <img
                                src={petbotLogo}
                                alt="PetBot"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <h1 className="mt-2 text-lg font-bold text-[#5C4033]">
                            PetBot
                        </h1>

                    </div>

                </div>

                {/* MENÚ */}
                <nav className="flex-1 p-3 flex flex-col gap-2">

                    {menuItems.map((item) => {

                        const Icon = item.icon;
                        const active = section === item.id;

                        return (
                            <button
                                key={item.id}
                                onClick={() => handleChange(item.id)}
                                className={`
                                    relative
                                    flex items-center gap-3
                                    px-4 py-3
                                    rounded-xl
                                    transition-all duration-200

                                    ${active
                                        ? `
                                            bg-gradient-to-r
                                            from-[#D98E4F]
                                            to-[#E8A96A]
                                            text-white
                                            shadow-md
                                        `
                                        : `
                                            text-[#5C4033]
                                            hover:bg-white
                                            hover:shadow-sm
                                        `
                                    }
                                `}
                            >
                                {active && (
                                    <div className="
                                        absolute
                                        left-0
                                        top-2
                                        bottom-2
                                        w-1
                                        bg-white
                                        rounded-r-full
                                    " />
                                )}

                                <Icon
                                    size={20}
                                    strokeWidth={2.2}
                                    className={
                                        active
                                            ? "text-white"
                                            : "text-[#8B6F5A]"
                                    }
                                />

                                <span className="font-medium">
                                    {item.label}
                                </span>

                            </button>
                        );
                    })}
                </nav>

                {/* TARJETA */}
                <div className="px-3 pb-3">

                    <div className="
                        bg-white
                        border border-[#EFE6DD]
                        rounded-xl
                        p-3
                        shadow-sm
                    ">
                        <div className="flex items-center gap-3">

                            <div className="
                                w-9 h-9
                                rounded-lg
                                bg-[#FFF1E2]
                                flex items-center justify-center
                            ">
                                <Heart size={18} className="text-[#D98E4F]" />
                            </div>

                            <div>
                                <p className="font-semibold text-[#5C4033] text-sm">
                                    Bienestar Animal
                                </p>

                                <div className="flex items-center gap-1 mt-1">
                                    <ShieldPlus size={12} className="text-[#D98E4F]" />
                                    <span className="text-xs text-[#8B6F5A]">
                                        Salud y cuidados
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                {/* LOGOUT */}
                <div className="p-3 border-t border-[#E5DDD5]">

                    <button
                        onClick={handleLogout}
                        className="
                            flex items-center gap-3
                            w-full
                            p-3
                            rounded-xl
                            text-red-600
                            hover:bg-red-50
                            transition-all duration-200
                        "
                    >
                        <LogOut size={18} strokeWidth={2.2} />

                        <span className="font-medium">
                            Salir
                        </span>

                    </button>

                </div>

            </aside>
        </>
    );
}

export default Sidebar;