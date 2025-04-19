function Alert() {
    return (
        <>
            <div className="flex items-center justify-between border-b border-[#2e2e3e] bg-[#1a1a2e] px-4 py-2 text-cyan-300 shadow-md shadow-cyan-500/10">
                <span> </span>

                <p className="text-center font-semibold tracking-wide text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]">
                    {/* Try to increase your fitness. */}
                </p>

                <button
                    type="button"
                    aria-label="Dismiss"
                    className="rounded border border-cyan-500 bg-[#1f1f2e] p-1.5 transition duration-300 hover:bg-cyan-600 hover:text-white hover:shadow-[0_0_10px_rgba(34,211,238,0.7)]"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-5"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </>
    );
}

export default Alert;
