function PetCard({ pet }) {
    return (
        <div
            style={{
                border: "1px solid #E8DDD3",
                borderRadius: "12px",
                padding: "10px",
                marginBottom: "8px",
                background: "#FAF6F1"
            }}
        >
            <div
                style={{
                    fontWeight: "bold",
                    color: "#6B3F1F",
                    marginBottom: "4px"
                }}
            >
                {pet.name}
            </div>

            <div>
                Tipo: {pet.type}
            </div>

            <div>
                Raza: {pet.breed || "No especificada"}
            </div>
        </div>
    );
}

export default PetCard;