import { useUsersContext } from "../hooks/useUsersContext";
import { useAuthContext } from "../hooks/useAuthContext";

const UserDetails = ({ user }) => {
    const { dispatch } = useUsersContext();
    // different from the one in the function
    const { user: currentUser } = useAuthContext();

    const handleClick = async () => {
        if (!currentUser || currentUser.rule !== "admin") {
            return;
        }
        if (currentUser._id === user._id) {
            return;
        }
        // TODO : change to the api after working on the backend
        const response = await fetch("/api/user/", {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
        const json = await response.json();
        if (response.ok) {
            dispatch({ type: "DELETE_USER", payload: json });
        }
    };
    // "title": "The Dark Knight",
    // "genre": "Action",
    // "summary": "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    // "director": "Frank Darabont",
    // "year": 1994,
    // "image": "url/to/image"
    return (
        <div className="user-details">
            <p>
                <strong>Email: </strong>
                {user.email}
            </p>
            <p>
                <strong>Rule: </strong>
                {user.rule}
            </p>
            <span className="material-symbols-outlined" onClick={handleClick}>
                delete
            </span>
        </div>
    );
};

export default UserDetails;
