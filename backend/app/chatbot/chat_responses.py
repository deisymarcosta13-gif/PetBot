def main_menu(user_name="Usuario"):
    return {
        "type": "menu",
        "text": f"Hola {user_name}\n\n¿A qué sección deseas ingresar hoy?",
        "buttons": [
            "Mascotas",
            "Medicamentos",
            "Citas"
        ]
    }


def pets_menu():
    return {
        "type": "menu",
        "text": "Sección Mascotas\n\n¿Qué deseas hacer?",
        "buttons": [
            "Agregar mascota",
            "Ver mascotas",
            "Menú principal"
        ]
    }


def medications_menu():
    return {
        "type": "menu",
        "text": "Sección Medicamentos\n\n¿Qué deseas hacer?",
        "buttons": [
            "Agregar medicamento",
            "Ver medicamentos",
            "Menú principal"
        ]
    }


def appointments_menu():
    return {
        "type": "menu",
        "text": "Sección Citas\n\n¿Qué deseas hacer?",
        "buttons": [
            "Agendar cita",
            "Ver citas",
            "Menú principal"
        ]
    }


def add_pet_start():
    return {
        "type": "pet_flow",
        "step": 1,
        "text": "Vamos a agregar una mascota.\n\n¿Cómo se llama?"
    }

