import { useState, useEffect } from "react";

function Card2({ exercises }) {
    const [exercisesState, setExercises] = useState([]);

    useEffect(() => {
        setExercises(exercises);
    }, [exercises]);

    const formatType = (type) => {
        const formattedTypes = {
            pushUps: "Push Ups",
            squat: "Squats",
            planks: "Planks",
            bicepsCurl: "Biceps Curl",
            running: "Running"
        };
        return formattedTypes[type] || type;
    };

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

    const totalCount = exercisesState.filter(e => e.completed).length;

    return (
        <div className="grid w-full">
            <div className="col-span-1 rounded-lg bg-gradient-to-r from-[#0f0f1a] via-[#141421] to-[#0f0f1a] p-6 shadow-lg text-white">
                <div className="space-y-4">
                    {exercisesState.map((exercise, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between bg-[#1e1e2e] p-3 rounded-lg shadow hover:shadow-cyan-500/30 transition"
                        >
                            <div>
                                <p className="font-medium text-cyan-200">{formatType(exercise.type)}</p>
                                {/* <p className="text-xs text-gray-400">{exercise.practise}</p>
                                <p className="text-xs text-gray-400">{exercise.tips}</p> */}
                                {/* <p className="text-xs text-gray-400">Reps/Value: {exercise.value}</p> */}
                                <p className="text-xs text-gray-400">[{exercise.done} / {exercise.value}]</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Total Reps or Time */}
                <div className="mt-4 text-cyan-300">
                    <p>Total Completed: {totalCount}</p>
                </div>
            </div>
        </div>
    );
}

export default Card2;
