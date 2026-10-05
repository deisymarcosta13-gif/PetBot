import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { User, Mail, Lock,  Eye, EyeOff } from "lucide-react";
import petbotLogo from "../assets/images/petbot.png";
import { registerUser } from "../services/authService";

function Register() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {

        if (!formData.password && !formData.email.trim() && !formData.name.trim()) {
        toast.error("Todos los campos son obligatorios");
        return false;
        }

        if (!formData.name.trim()) {
        toast.error("Ingresa tu nombre");
        return false;
        }

        if (!formData.email.trim()) {
        toast.error("Ingresa tu correo");
        return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(formData.email)) {
        toast.error("Correo electrónico inválido");
        return false;
        }

        if (!formData.password) {
        toast.error("Ingresa una contraseña");
        return false;
        }

        if (!formData.password && !formData.email.trim() && !formData.name.trim()) {
        toast.error("Completa todos los campos");
        return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
        return;
        }

        try {
        setLoading(true);

        const response = await registerUser(formData);

        toast.success(response.message);

        setTimeout(() => {
            navigate("/");
        }, 1500);

        } catch (error) {

        if (error.response) {
            toast.error(error.response.data.message);
        } else {
            toast.error("No se pudo conectar con el servidor");
        }

        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#F8F4EF] via-[#F3E7DA] to-[#F8F4EF] flex items-center justify-center px-4 py-4">

        <div
            className="
            bg-white
            w-full
            max-w-sm
            rounded-[28px]
            p-5
            sm:p-6
            border-2 border-[#8B5E3C]
            "
            style={{
            boxShadow:
                "0 15px 40px rgba(92,64,51,0.10), 0 4px 10px rgba(92,64,51,0.05)",
            }}
        >
            <div className="text-center mb-5">

            <div className="flex justify-center mb-3">
                <div className="bg-[#F3E7DA] p-1.5 rounded-full">
                <img
                    src={petbotLogo}
                    alt="PetBot Logo"
                    className="w-14 h-14 sm:w-16 sm:h-16 object-contain rounded-full"
                />
                </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-[#5C4033]">
                PetBot
            </h1>

            <p className="mt-2 text-[#8B5E3C] font-medium text-sm">
                ¡Únete a nuestra comunidad!
            </p>

            <p className="text-xs sm:text-sm text-gray-500 mt-1 leading-relaxed">
                Cuida a tus mascotas con ayuda de la inteligencia artificial.
            </p>

            </div>

            <form
            className="space-y-3"
            onSubmit={handleSubmit}
            >

            <div className="relative">
                <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#BFA18A]"
                />

                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nombre completo"
                    className="
                    w-full
                    py-3
                    pl-11
                    pr-4
                    rounded-xl
                    bg-[#FAF7F4]
                    border
                    border-[#E5DDD5]
                    outline-none
                    transition-all
                    duration-200
                    focus:border-[#8B5E3C]
                    focus:ring-2
                    focus:ring-[#8B5E3C]/10
                    "
                />
            </div>

            <div className="relative">
                <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#BFA18A]"
                />

                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Correo electrónico"
                    className="
                    w-full
                    py-3
                    pl-11
                    pr-4
                    rounded-xl
                    bg-[#FAF7F4]
                    border
                    border-[#E5DDD5]
                    outline-none
                    transition-all
                    duration-200
                    focus:border-[#8B5E3C]
                    focus:ring-2
                    focus:ring-[#8B5E3C]/10
                    "
                />
            </div>

            <div className="relative">
                <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#BFA18A]"
                />

                <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Contraseña"
                    className="
                    w-full
                    py-3
                    pl-11
                    pr-11
                    rounded-xl
                    bg-[#FAF7F4]
                    border
                    border-[#E5DDD5]
                    outline-none
                    transition-all
                    duration-200
                    focus:border-[#8B5E3C]
                    focus:ring-2
                    focus:ring-[#8B5E3C]/10
                    "
                />

                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-[#BFA18A]
                    hover:text-[#8B5E3C]
                    hover:scale-110
                    transition-all
                    duration-200
                    "
                >
                    {showPassword ? (
                        <EyeOff size={18} />
                    ) : (
                        <Eye size={18} />
                    )}
                </button>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="
                w-full
                bg-[#8B5E3C]
                hover:bg-[#6E472D]
                text-white
                py-3
                rounded-xl
                font-semibold
                transition-all
                duration-300
                disabled:opacity-70
                "
            >
                {loading ? "Creando cuenta..." : "Crear cuenta"}
            </button>

            </form>

            <div className="text-center mt-4">

            <p className="text-gray-500 text-sm">
                ¿Ya tienes una cuenta?{" "}
                <Link
                to="/"
                className="
                    text-[#8B5E3C]
                    font-semibold
                    hover:text-[#5C4033]
                    transition-colors
                "
                >
                Inicia sesión
                </Link>
            </p>

            </div>

        </div>

        </div>
    );
}

export default Register;

