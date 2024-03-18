import { useEffect } from "react";
import { useUsersContext } from "../hooks/useUsersContext";
import { useAuthContext } from "../hooks/useAuthContext";
// components
import UserDetails from "../components/UserDetails";

const Users = () => {
    const { users, dispatch } = useUsersContext();
    const { user } = useAuthContext();
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch("/api/user/getUsers", {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            const json = await response.json();

            if (response.ok) {
                dispatch({ type: "SET_USERS", payload: json });
            }
        };
        if (user.rule === "admin") {
            fetchUsers();
        }
    }, [dispatch, user]);

    return (
        <div className="users">
            {users && users.map((us) => <UserDetails key={us._id} user={us} />)}
        </div>
    );
};

export default Users;
