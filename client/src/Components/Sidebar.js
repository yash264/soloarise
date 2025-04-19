import Stack from '@mui/material/Stack';
import { Gauge } from '@mui/x-charts/Gauge';
import avatar from "../Assets/avatar.png";

function Sidebar() {
    return (
        <>
            <div className="flex mt-6 rounded flex-col justify-between  border-gray-100 bg-slate-800">
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
                                className="block rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-gray-100 hover:text-gray-700"
                            >
                                Achievements
                            </a>
                        </li>

                        <li>
                            <a
                                href="#"
                                className="block rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-gray-100 hover:text-gray-700"
                            >
                                Badges & Points
                            </a>
                        </li>

                    </ul>
                </div>

            </div>
        </>
    )
}

export default Sidebar;