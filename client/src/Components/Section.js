import Sidebar from "./Sidebar";
import Cards from "./Cards";

function Section() {
    return (
        <>
            <section className="bg-[#0e0e1c] min-h-screen py-10">
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:items-start">
                        <div className="bg-[#1a1a2e] rounded-xl shadow-lg shadow-cyan-500/10 p-4">
                            <Sidebar />
                        </div>

                        <div className="bg-[#1a1a2e] rounded-xl shadow-lg shadow-purple-500/10 p-4">
                            <h3 className="p-2 text-lg font-semibold text-center text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.7)]">
                                Daily Quest Panel
                            </h3>
                            <Cards />
                        </div>

                        <div className="bg-[#1a1a2e] rounded-xl shadow-lg shadow-indigo-500/10 p-4">
                            <h2 className="text-2xl font-semibold text-purple-300 sm:text-3xl drop-shadow-[0_0_12px_rgba(168,85,247,0.6)]">
                                Buff's & Debuff's Panel
                            </h2>

                            <p className="mt-4 text-sm text-gray-400">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur doloremque saepe
                                architecto maiores repudiandae amet perferendis repellendus, reprehenderit voluptas
                                sequi.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Section;
