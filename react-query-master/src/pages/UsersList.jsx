import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../api/api";
import { NavLink } from "react-router";


const UsersList = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["users"],
        queryFn: fetchUsers,
    });

    if (isLoading) return <p>Loading users...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    return (
        <div>
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Users List</h1>
                <ul className="space-y-2">
                    {data.map((user) => (

                        <li key={user.id} className="p-4 bg-[#21303a] hover:bg-gray-600 border-l-4 border-green-500  shadow rounded-md">
                            <NavLink to={`/users/${user.id}`} >
                                {user.name} - {user.email}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default UsersList