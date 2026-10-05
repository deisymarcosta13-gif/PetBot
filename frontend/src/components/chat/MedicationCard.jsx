function MedicationCard({ medication }) {

    return (

        <div className="border border-[#E8DDD3] rounded-xl p-3 mb-2 bg-[#FAF6F1]">

            <div className="font-semibold text-[#6B3F1F] mb-1">
                {medication.name}
            </div>

            <div className="text-sm text-gray-700">
                Dosis: {medication.dosage}
            </div>

            <div className="text-sm text-gray-700">
                Frecuencia: {medication.frequency}
            </div>
            <div className="text-sm text-gray-700 ">
                Para: {medication.pet_name}
            </div>

        </div>

    );

}

export default MedicationCard;