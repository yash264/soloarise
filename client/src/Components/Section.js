import Sidebar from "./Sidebar";
import Cards from "./Cards";
import Card2 from "./Card2";

function Section() {
    return (
        <>
            <section className=" min-h-screen py-10">
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:items-start">
                        {/* <div className="bg-[#1a1a2e] rounded-xl shadow-lg shadow-cyan-500/10 p-4">
                            <Sidebar />
                        </div> */}

                        <div className="bg-[#1a1a2e] rounded-xl shadow-lg shadow-indigo-500/10 p-4">
                            <h2 className="p-2 text-lg font-semibold text-center text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.7)]">
                                Quote of the Day
                            </h2>

                            <p className="mt-4 text-sm text-gray-400">
                                The path to strength begins with the first step of perseverance.
                            </p>
                        </div>
                        <div className="bg-[#1a1a2e] rounded-xl shadow-lg shadow-purple-500/10 p-4">
                            <h3 className="p-2 text-lg font-semibold text-center text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.7)]">
                                Daily Quest Panel
                            </h3>
                            <Cards />
                        </div>
                        <div className="bg-[#1a1a2e] rounded-xl shadow-lg shadow-purple-500/10 p-4">
                            <h3 className="p-2 text-lg font-semibold text-center text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.7)]">
                                Total Progress
                            </h3>
                            <Card2 />
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}

export default Section;
