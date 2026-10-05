from app.chatbot.chat_responses import (
    main_menu,
    pets_menu,
    medications_menu,
    appointments_menu,
    add_pet_start
)

def get_user_pets(
    db,
    user_id
):

    pets = db.query(Pet).filter(
        Pet.user_id == user_id
    ).all()

    return [
        {
            "id": pet.id,
            "name": pet.name,
            "type": pet.type,
            "breed": pet.breed,
            "image_url": pet.image_url
        }
        for pet in pets
    ]


def process_message(
    message: str,
    db,
    current_user
):

    message = message.lower().strip()

    # MENÚ PRINCIPAL

    if message == "menu":
        return main_menu(current_user.name)

    if message == "menú principal":
        return main_menu(current_user.name)

    # MENÚS

    if message == "mascotas":
        return pets_menu()

    if message == "medicamentos":
        return medications_menu()

    if message == "citas":
        return appointments_menu()

    # MASCOTAS
    
    if message == "agregar mascota":
        
        return add_pet_start()
    
    if message == "medicamentos":
        return medications_menu()

        return add_appointment_start()

    # RESPUESTA POR DEFECTO

    return {
        "type": "text",
        "text": f"No entendí: {message}"
    }