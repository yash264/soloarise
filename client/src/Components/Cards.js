import { useState } from "react";
import { CheckIcon, XIcon } from "@heroicons/react/outline";

function Cards() {
    // Exercise list with completion state
    const exercises = [
        { name: "Push-ups", completed: false },
        { name: "Squats", completed: false },
        { name: "Plank", completed: true },
        { name: "Jumping Jacks", completed: false },
        { name: "Lunges", completed: true },
    ];

    // Toggle exercise completion
    const toggleCompletion = (index) => {
        
    };

    const [exercisesState, setExercises] = useState(exercises);

    return (
        <>
            <div className="grid w-100">
                <div className="col-span-1 rounded-lg bg-gradient-to-r from-[#0f0f1a] via-[#141421] to-[#0f0f1a] p-6 shadow-lg text-white">
                    {/* <h3 className="text-xl font-semibold text-center mb-4">Daily Exercises</h3> */}
                    <div className="space-y-4">
                        {exercisesState.map((exercise, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <span>{exercise.name}</span>
                                <button
                                    onClick={() => toggleCompletion(index)}
                                    className={`flex items-center justify-center text-sm p-2 rounded-lg transition-colors ${exercise.completed ? "bg-green-500" : "bg-red-500"
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
        </>
    );
}

export default Cards;
