import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();
    const handleClick = () => {
        logout();
    };

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>MovieHub</h1>
                </Link>
                <nav>
                    {user && user.rule === "admin" && (
                        <div>
                            <span>{user.email}</span>
                            <Link to="/users">
                                <button type="button">Users</button>
                            </Link>
                            <Link to="/movies">
                                <button type="button">Movies</button>
                            </Link>
                            <button onClick={handleClick}>Logout</button>
                        </div>
                    )}
                    {user && user.rule !== "admin" && (
                        <div>
                            <span>{user.email}</span>
                            <button onClick={handleClick}>Logout</button>
                        </div>
                    )}
                    {!user && (
                        <div>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Sign Up</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
