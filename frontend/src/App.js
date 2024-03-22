import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
// pages & components
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Users from "./pages/Users";
import Watchlist from "./pages/Watchlist";

function App() {
    const { user } = useAuthContext();
    const isAdmin = user && user.rule === "admin";
    const isUser = user && user.rule === "user";
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                <div className="pages">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                isUser ? (
                                    <Home />
                                ) : isAdmin ? (
                                    <Navigate to="/users" />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />
                        <Route
                            path="/users"
                            element={isAdmin ? <Users /> : <Navigate to="/" />}
                        />
                        <Route
                            path="/login"
                            element={!user ? <Login /> : <Navigate to="/" />}
                        />
                        <Route
                            path="/signup"
                            element={!user ? <Signup /> : <Navigate to="/" />}
                        />
                        <Route
                            path="/watchlist"
                            element={user ? <Watchlist /> : <Navigate to="/login" />}
/>

                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
