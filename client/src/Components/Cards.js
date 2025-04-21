import { useState, useEffect } from "react";
import { CheckIcon, XIcon } from "@heroicons/react/outline";

function Cards({ exercises }) {
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
        };

        return formattedTypes[type] || type;
    };

    // const toggleCompletion = (index) => {
    //     const updated = [...exercisesState];
    //     updated[index].completed = !updated[index].completed;
    //     setExercises(updated);
    // };
    

    return (
        <div className="grid w-100">
            <div className="col-span-1 rounded-lg bg-gradient-to-r from-[#0f0f1a] via-[#141421] to-[#0f0f1a] p-6 shadow-lg text-white">
                <div className="space-y-4">
                    {exercisesState.map((exercise, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <span>{formatType(exercise.type)}</span>
                            <button
                                // onClick={() => toggleCompletion(index)}
                                className={`flex items-center justify-center text-sm p-2 rounded-lg transition-colors ${
                                    exercise.completed ? "bg-green-500" : "bg-red-500"
                                }`}
                            >
                                {exercise.completed ? (
                                    <CheckIcon className="h-5 w-5 text-white" />
                                ) : (
                                    <XIcon className="h-5 w-5 text-white" />
                                )}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Cards;
