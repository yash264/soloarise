import { useState, useEffect, useContext } from "react";
import SideBar from "./Sidebar";
import { UserContext } from "../Context/UserContext";

function LeaderBoard() {
    const { user } = useContext(UserContext);
    const token = localStorage.getItem("token");

    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;
    const [totalUsers, setTotalUsers] = useState(0);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const offset = (currentPage - 1) * usersPerPage;
                const res = await fetch(
                    `http://localhost:4000/api/user/leaderboard?offset=${offset}&limit=${usersPerPage}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const data = await res.json();

                if (data.success && Array.isArray(data.users)) {
                    setUsers(data.users);
                    setTotalUsers(data.totalUsers);
                    setCurrentUser(data.currentUser);
                } else {
                    console.error("Invalid data format:", data);
                }
            } catch (error) {
                console.error("Error fetching leaderboard:", error);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchUsers();
        }
    }, [token, currentPage]);

    const totalPages = Math.ceil(totalUsers / usersPerPage);

    return (
        <section className="min-h-screen py-12">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 mt-12">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:items-start">
                    <SideBar />

                    <div className="bg-[#1a1a2e] rounded-xl shadow-md shadow-purple-500/10 p-5 md:col-span-2 w-full">
                        <h3 className="p-2 text-lg font-semibold text-center text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]">
                            LeaderBoard
                        </h3>

                        <div className="mt-10">
                            {loading ? (
                                <div className="flex justify-center items-center py-10">
                                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-400"></div>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-700 text-white text-sm">
                                        <thead>
                                            <tr className="bg-[#0f0f1a] text-cyan-200">
                                                <th className="px-3 py-2 text-left">Rank</th>
                                                <th className="px-3 py-2 text-left">Name</th>
                                                <th className="px-3 py-2 text-left">Username</th>
                                                <th className="px-3 py-2 text-left">Email</th>
                                                <th className="px-3 py-2 text-left">Points</th>
                                                <th className="px-3 py-2 text-left">Level</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-600">
                                            {/* Pinned current user at the top */}
                                            {currentUser && (
                                                <tr
                                                    key={"top-" + currentUser._id}
                                                    className="bg-[#4c4c8c] font-semibold text-white"
                                                >
                                                    <td className="px-3 py-2">{currentUser.rank}</td>
                                                    <td className="px-3 py-2">{currentUser.name}</td>
                                                    <td className="px-3 py-2">{currentUser.username}</td>
                                                    <td className="px-3 py-2">{currentUser.email}</td>
                                                    <td className="px-3 py-2">{currentUser.points}</td>
                                                    <td className="px-3 py-2">{currentUser.level}</td>
                                                </tr>
                                            )}

                                            {/* Render all users (including currentUser) normally */}
                                            {users.map((user, index) => {
                                                const rank =
                                                    (currentPage - 1) * usersPerPage + index + 1;

                                                return (
                                                    <tr
                                                        key={user._id}
                                                        className="hover:bg-[#2a2a40] transition-all"
                                                    >
                                                        <td className="px-3 py-2">{rank}</td>
                                                        <td className="px-3 py-2">{user.name}</td>
                                                        <td className="px-3 py-2">{user.username}</td>
                                                        <td className="px-3 py-2">{user.email}</td>
                                                        <td className="px-3 py-2">{user.points}</td>
                                                        <td className="px-3 py-2">{user.level}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>

                        {currentUser && (
  <div className="text-center mt-4">
    <button
      onClick={() => {
        const myPage = Math.ceil(currentUser.rank / usersPerPage);
        setCurrentPage(myPage);
      }}
      className="text-xs px-3 py-1 bg-cyan-600 text-white rounded hover:bg-cyan-700 transition"
    >
      Jump to my rank
    </button>
  </div>
)}


                        {/* Pagination Buttons */}
                        <div className="flex justify-center mt-6 flex-wrap gap-2">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                                <button
                                    key={pageNum}
                                    onClick={() => setCurrentPage(pageNum)}
                                    className={`px-4 py-2 rounded-lg ${
                                        currentPage === pageNum
                                            ? "bg-cyan-600 text-white"
                                            : "bg-gray-700 text-cyan-300"
                                    }`}
                                >
                                    {pageNum}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LeaderBoard;
