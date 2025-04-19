import BicepCurlCounter from "../Fitness/BicepCurlCounter";
import PlankHoldTimer from "../Fitness/PlankHoldCounter";
import PushupCounter from "../Fitness/PushupCounter";
import SquatCounter from "../Fitness/SquatCounter";

function Banner({ exercise }) {
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

    const counterComponents = {
        pushUps: PushupCounter,
        bicepsCurl: BicepCurlCounter,
        planks: PlankHoldTimer,
        squat: SquatCounter
    };
    const SelectedCounter = counterComponents[exercise.type];

    return (
        <>
            <section>
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:items-center md:gap-8">
                        <div className="md:col-span-1">
                            <div className="max-w-lg md:max-w-none">

                                <div className="bg-[#1a1a2e] rounded-xl shadow-lg shadow-indigo-500/10 p-4">
                                    <h2 className="p-2 text-lg font-semibold text-center text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.7)]">
                                        Daily Quest
                                    </h2>

                                    <p className="mt-4 text-sm text-gray-400">
                                        Challenge accepted: {exercise.tips}
                                    </p>

                                    <div>
                                        <p className="font-medium text-cyan-200">{formatType(exercise.type)}</p>
                                        <p className="text-medium text-gray-400">{exercise.value}</p>
                                    </div>

                                </div>

                            </div>
                        </div>

                        <div className="md:col-span-3 flex justify-center">
                        {SelectedCounter ? (
                            <SelectedCounter exercise={exercise} />
                        ) : (
                            <p className="text-gray-400">No counter available for this exercise.</p>
                        )}
                    </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Banner;