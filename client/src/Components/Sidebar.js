import Stack from '@mui/material/Stack';
import { Gauge } from '@mui/x-charts/Gauge';
import avatar from "../Assets/avatar.png";

function Sidebar() {
    return (
        <>
            <div className="flex flex-col justify-between border-e border-gray-100 bg-white">
                <div className="px-4 py-6">

                    <ul className="mt-2 space-y-4">

                        <li>
                            <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, md: 3 }}>
                                <Gauge width={100} height={100} value={50} />
                                <Gauge width={100} height={100} value={60} startAngle={-90} endAngle={90} />
                            </Stack>
                        </li>

                        <li>
                            <a
                                href="#"
                                className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                            >
                                General
                            </a>
                        </li>

                        <li>
                            <a
                                href="#"
                                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                            >
                                Ranking
                            </a>
                        </li>

                        <li>
                            <a
                                href="#"
                                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                            >
                                Levelling Log
                            </a>
                        </li>

                    </ul>
                </div>

                <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
                    <a href="#" className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
                        <img
                            src={avatar}
                            alt="Logo"
                            className="w-12 h-12 rounded-full shadow-lg border-2 border-white bg-white"
                        />

                        <div>
                            <p className="text-xs">
                                <strong className="block font-medium">Yash Pandey</strong>

                                <span> yash.20222068@mnnit.ac.in </span>
                            </p>
                        </div>
                    </a>
                </div>
            </div>
        </>
    )
}

export default Sidebar;