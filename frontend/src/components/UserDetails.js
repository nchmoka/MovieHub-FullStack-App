import { useState } from "react";
import { useUsersContext } from "../hooks/useUsersContext";
import { useAuthContext } from "../hooks/useAuthContext";

const UserDetails = ({ user }) => {
    const { dispatch } = useUsersContext();
    const { user: currentUser } = useAuthContext();
    const [editing, setEditing] = useState(false);
    const [newRule, setNewRule] = useState(user.rule);
    const [error, setError] = useState(null);
    const handleEdit = async () => {
        if (!currentUser || currentUser.rule !== "admin") {
            setError("You need to be admin to edit a user");
            return;
        }
        if (currentUser.email === user.email) {
            setError("You cant edit your own rule");
            return;
        }
        if (newRule !== "admin" && newRule !== "user") {
            setError("Rule must be admin or user");
            return;
        }
        const response = await fetch(`/api/user/changeUserRole/${user._id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${currentUser.token}`,
            },
            body: JSON.stringify({ rule: newRule }),
        });
        const json = await response.json();
        if (response.ok) {
            dispatch({ type: "EDIT_USER", payload: json });
            setEditing(false);
            setError(null);
            // set the rule to the new rull
            user.rule = newRule;
        }
        if (!response.ok) {
            setError(json.error);
        }
    };

    const handleDelete = async () => {
        if (!currentUser || currentUser.rule !== "admin") {
            setError("You need to be admin to delete a user");
            return;
        }
        if (currentUser.email === user.email) {
            setError("You cant delete yourself");
            return;
        }
        const response = await fetch(`/api/user/${user._id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${currentUser.token}`,
            },
        });
        const json = await response.json();
        if (response.ok) {
            setError(null);
            dispatch({ type: "DELETE_USER", payload: json });
        }
        if (!response.ok) {
            setError(json.error);
        }
    };

    return (
        <div className="user-details">
            <p>
                <strong>Email: </strong>
                {user.email}
            </p>
            {editing ? (
                <p>
                    <strong>
                        New Rule:
                        <input
                            type="text"
                            value={newRule}
                            onChange={(e) => setNewRule(e.target.value)}
                        />
                    </strong>
                    <button onClick={handleEdit}>Save</button>
                    <button
                        style={{ background: "#e7195a" }}
                        onClick={() => setEditing(false)}
                    >
                        Cancel
                    </button>
                </p>
            ) : (
                <p>
                    <strong>Rule: </strong>
                    {user.rule}
                    {currentUser && currentUser.rule === "admin" && (
                        <button
                            style={{ marginLeft: "5px" }}
                            onClick={() => setEditing(true)}
                        >
                            Edit
                        </button>
                    )}
                </p>
            )}
            {currentUser &&
                currentUser.rule === "admin" &&
                currentUser._id !== user._id && (
                    <span
                        className="material-symbols-outlined"
                        onClick={handleDelete}
                    >
                        {" "}
                        delete
                    </span>
                )}
            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default UserDetails;
