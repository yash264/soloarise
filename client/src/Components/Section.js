import Sidebar from "./Sidebar";
import Cards from "./Cards";

function Section() {
    return (
        <>
            <section>
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:items-start md:gap-8">
                        <div>
                            <div className="max-w-lg md:max-w-none">
                                <Sidebar />
                            </div>
                        </div>

                        <div>
                            <div className="max-w-lg md:max-w-none">
                                <h3 className="p-2 text-lg font-medium text-center text-pretty text-gray-900">
                                    Daily Quest Panel
                                </h3>
                                <Cards />
                            </div>
                        </div>

                        <div>
                            <div className="max-w-lg md:max-w-none">
                                <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
                                    Buff's & Debuff's Panel
                                </h2>

                                <p className="mt-4 text-gray-700">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur doloremque saepe
                                    architecto maiores repudiandae amet perferendis repellendus, reprehenderit voluptas
                                    sequi.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section></>
    )
}

export default Section;