function AppointmentCard({ appointment }) {

    return (

        <div className="border border-[#E8DDD3] rounded-xl p-3 mb-2 bg-[#FAF6F1]">

            <div className="font-bold text-[#6B3F1F] mb-2">

                {appointment.reason}

            </div>

            <div>

                Fecha: {appointment.date}

            </div>

            <div>
                Hora: {appointment.time}
            </div>
            <div >
                Para: {appointment.pet_name}
            </div>

        </div>

    );

}

export default AppointmentCard;