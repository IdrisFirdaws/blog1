import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../UserContext";

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [redirect, setRedirect] = useState(false);
    const { setUserInfo } = useContext(UserContext);

    async function register(ev) {
        ev.preventDefault();
        setIsLoading(true);
        setError("");
        setSuccess("");

        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await fetch(`${apiUrl}/register`, {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                const userInfo = await response.json(); // Parse the JSON response
                setSuccess("Registration successful!");
                setUserInfo(userInfo); // Update user info in context
                setRedirect(true); // Handle successful registration here (e.g., redirect to dashboard)

            } else {
                const errorData = await response.json();
                setError(errorData.message || "Registration failed");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        }

        setIsLoading(false);
    }

    if (redirect) {
        return <Navigate to={'/admin'} />
    }

    return (
        <div className="register">
            <div className="registerTitle">Register</div>
            <form onSubmit={register}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(ev) => setUsername(ev.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(ev) => setPassword(ev.target.value)}
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Registering..." : "Register"}
                </button>
            </form>
            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}
        </div>
    );
}
