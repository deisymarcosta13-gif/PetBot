function SectionHeader({ title, subtitle, icon: Icon }) {
    return (
        <div
            className="
                sticky top-0 z-20
                mb-6
                flex items-start justify-between
                gap-4

                bg-white/70
                backdrop-blur-md

                px-4 py-4

                border-b border-[#EFE6DD]
            "
        >

            {/* TEXTO */}
            <div>
                <h2
                    className="
                        text-2xl
                        font-bold
                        text-[#2C1810]
                        tracking-tight
                    "
                >
                    {title}
                </h2>

                {subtitle && (
                    <p
                        className="
                            text-sm
                            text-[#8B6F5A]
                            mt-1
                            leading-snug
                        "
                    >
                        {subtitle}
                    </p>
                )}
            </div>

            {/* ICONO */}
            {Icon && (
                <div
                    className="
                        w-11 h-11
                        rounded-xl
                        bg-[#F0E6D9]
                        flex items-center justify-center
                        shadow-sm
                        border border-[#E8DDD3]
                        shrink-0
                    "
                >
                    <Icon size={20} className="text-[#8B5E3C]" />
                </div>
            )}

        </div>
    );
}

export default SectionHeader;