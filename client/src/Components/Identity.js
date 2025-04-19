

function Identity() {
    return (
        <>
            <section>
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="grid mt-14 grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">

                        <div className="flex mt-12 justify-center items-center">
                            <img
                                src="https://i.pinimg.com/736x/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg"
                                className="w-24 h-24 items-center rounded-full"
                                alt=""
                            />
                        </div>

                        <div>
                            <section className="bg-slate-800 lg:grid lg:place-content-center rounded-2xl">
                                <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
                                    <div className="mx-auto max-w-prose text-center">
                                        <h1 className="text-4xl font-bold text-white sm:text-5xl">
                                            Name
                                            <strong className="text-indigo-600"> Virat Kohli </strong>
                                        </h1>

                                        <p className="mt-4 text-base text-pretty text-white sm:text-lg/relaxed">
                                            Describe About YourSelf
                                        </p>

                                        <div className="mt-4 flex justify-center gap-4 sm:mt-6">
                                            <a
                                                className="inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
                                                href="#"
                                            >
                                                Update
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default Identity;