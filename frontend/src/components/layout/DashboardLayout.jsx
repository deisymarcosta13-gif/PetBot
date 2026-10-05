import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "../Sidebar";
import ChatBox from "../chat/ChatBox";
import PetsSection from "../sections/PetsSection";
import AppointmentsSection from "../sections/AppointmentsSection";
import MedicationsSection from "../sections/MedicationsSection";
import AIChatSection from "../AIChatSection";

function DashboardLayout() {

    const [section, setSection] = useState("chat");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const renderContent = () => {
        switch (section) {

            case "pets":
                return <PetsSection />;

            case "appointments":
                return <AppointmentsSection />;

            case "meds":
                return <MedicationsSection />;
            
            case "ai-chat":
                return <AIChatSection />;

            default:
                return <ChatBox />;
        }
    };

    return (
        <div className="flex min-h-screen bg-[#F8F4EF]">

            {/* SIDEBAR */}
            <Sidebar
                setSection={setSection}
                isOpen={sidebarOpen}
                setIsOpen={setSidebarOpen}
            />

            {/* MAIN */}
            <main className="flex-1 p-4 md:p-6">

                {/* top bar mobile */}
                <div className="md:hidden flex items-center mb-4">
                    <button onClick={() => setSidebarOpen(true)}>
                        <Menu />
                    </button>
                    <h1 className="ml-3 font-bold text-[#5C4033]">PetBot</h1>
                </div>

                {renderContent()}
            </main>

        </div>
    );
}

export default DashboardLayout;