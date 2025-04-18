function Cards() {
    const exercises = [
        { name: "Push-ups", info: "x20 reps" },
        { name: "Squats", info: "x25 reps" },
        { name: "Plank", info: "60 sec" },
        { name: "Jumping Jacks", info: "x30 reps" },
        { name: "Lunges", info: "x20 reps each leg" },
    ];

    // Extract numeric value from info string
    const extractCount = (info) => {
        const numbers = info.match(/\d+/g);
        if (!numbers) return 0;

        if (info.includes("sec")) {
            return parseInt(numbers[0], 10); // count as seconds
        } else if (info.includes("each leg")) {
            return parseInt(numbers[0], 10) * 2; // for each leg
        } else {
            return parseInt(numbers[0], 10); // default reps
        }
    };

    const totalCount = exercises.reduce((sum, exercise) => sum + extractCount(exercise.info), 0);

    return (
        <div className="grid w-full">
            <div className="col-span-1 rounded-lg bg-gradient-to-r from-[#0f0f1a] via-[#141421] to-[#0f0f1a] p-6 shadow-lg text-white">
                {/* <h3 className="text-xl font-semibold text-center mb-6 text-cyan-300 tracking-wider drop-shadow">
                    Daily Exercise List
                </h3> */}

                <div className="space-y-4">
                    {exercises.map((exercise, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between bg-[#1e1e2e] p-3 rounded-lg shadow hover:shadow-cyan-500/30 transition"
                        >
                            <div>
                                <p className="font-medium text-cyan-200">{exercise.name}</p>
                                <p className="text-xs text-gray-400">{exercise.info}</p>
                            </div>
                        </div>
                    ))}
                </div>

               
            </div>
        </div>
    );
}

export default Cards;
