import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import petbotLogo from "../assets/images/petbot.png";
import { loginUser } from "../services/authService";

function Login() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
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

        if (!formData.email.trim() && !formData.password.trim()) {
            toast.error("Completa todos los campos");
            return false;
        }

        if (!formData.email.trim()) {
            toast.error("Ingresa tu correo electrónico");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(formData.email)) {
            toast.error("Correo electrónico inválido");
            return false;
        }

        if (!formData.password.trim()) {
            toast.error("Ingresa tu contraseña");
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

            const response = await loginUser(formData);

            localStorage.setItem(
                "token",
                response.token
            );

            toast.success(response.message);

            
            navigate("/dashboard");
            

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
                p-6
                sm:p-7
                border-2 border-[#8B5E3C]
                relative
                overflow-hidden
                "
                style={{
                    boxShadow:
                        "0 15px 40px rgba(92,64,51,0.10), 0 4px 10px rgba(92,64,51,0.05)",
                }}
            >

                {/* Header */}
                <div className="text-center mb-6">

                    <div className="flex justify-center mb-4">
                        <div className="bg-[#F3E7DA] p-2 rounded-full">
                            <img
                                src={petbotLogo}
                                alt="PetBot Logo"
                                className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-full"
                            />
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold text-[#5C4033]">
                        PetBot
                    </h1>

                    <p className="mt-2 text-[#8B5E3C] font-medium">
                        Bienvenido de nuevo
                    </p>

                    <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                        Porque cada mascota merece el mejor cuidado.
                    </p>

                </div>

                {/* Formulario */}
                <form
                    className="space-y-4"
                    onSubmit={handleSubmit}
                >

                    {/* Email */}
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

                    {/* Password */}
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

                    {/* Recuperar contraseña */}
                    <div className="flex justify-end">

                        <button
                            type="button"
                            className="
                            text-sm
                            text-[#8B5E3C]
                            hover:text-[#5C4033]
                            transition-colors
                            "
                        >
                            ¿Olvidaste tu contraseña?
                        </button>

                    </div>

                    {/* Botón */}
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
                        hover:scale-[1.01]
                        active:scale-[0.98]
                        disabled:opacity-70
                        disabled:cursor-not-allowed
                        "
                    >
                        {loading
                            ? "Iniciando sesión..."
                            : "Iniciar sesión"}
                    </button>

                </form>

                {/* Footer */}
                <div className="text-center mt-5">

                    <p className="text-gray-500 text-sm">
                        ¿No tienes una cuenta?{" "}
                        <Link
                            to="/register"
                            className="
                            text-[#8B5E3C]
                            font-semibold
                            hover:text-[#5C4033]
                            transition-colors
                            "
                        >
                            Regístrate
                        </Link>
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Login;