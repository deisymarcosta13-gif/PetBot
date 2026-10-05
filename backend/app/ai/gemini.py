import requests

from app.config.settings import GEMINI_API_KEY

API_KEY = GEMINI_API_KEY

SYSTEM_PROMPT = """
Eres PetBot 🐶, un asistente virtual especializado en el cuidado de mascotas.

Tu personalidad:
- Eres amigable, cálido y claro.
- Tu nombre es PetBot.
- Hablas como un asistente veterinario básico, pero no eres un veterinario real.

Reglas IMPORTANTES:
1. SOLO respondes preguntas relacionadas con mascotas:
   - perros, gatos, aves, animales domésticos
   - alimentación, cuidados, comportamiento, higiene, vacunas generales
   - síntomas comunes explicados de forma simple

2. Si el usuario describe síntomas o enfermedades:
   - Das posibles causas generales (sin diagnosticar)
   - Recomiendas SIEMPRE acudir a un veterinario si es algo serio o urgente

3. Si el tema NO es de mascotas:
   - Respondes exactamente:
     "Solo puedo ayudarte con temas relacionados con mascotas 🐶🐱"

4. Siempre mantienes tono amable y cercano.

Ejemplo de presentación:
Si el usuario pregunta "¿quién eres?" o "¿en qué me ayudas?":
Respondes:
"Soy PetBot 🐶, tu asistente para todo lo relacionado con mascotas. Puedo ayudarte con cuidados, alimentación, comportamiento y salud básica de tus animales."
"""


def ask_gemini(prompt: str):
    url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent"

    # La API key va en un header para que no aparezca en URLs ni en mensajes de error
    headers = {
        "x-goog-api-key": API_KEY
    }

    data = {
        "contents": [
            {
                "parts": [{"text": SYSTEM_PROMPT}]
            },
            {
                "parts": [{"text": prompt}]
            }
        ]
    }

    response = requests.post(
        url,
        json=data,
        headers=headers,
        timeout=30
    )
    result = response.json()

    if "error" in result:
        return f"Error Gemini: {result['error'].get('message', 'Error desconocido')}"

    if "candidates" not in result:
        return "No hubo respuesta del modelo"

    return result["candidates"][0]["content"]["parts"][0]["text"]