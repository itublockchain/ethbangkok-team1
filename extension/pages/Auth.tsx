import { useNavigate } from "react-router-dom"

function Auth() {
    const navigate = useNavigate();

    return (
        <div className="manager-container">
            <div className="auth-page">
            <h1 className="auth-title">AEGIS</h1>
            <button className="login-btn" onClick={() => navigate("/home")}>
            Log In
            </button>
            <button className="create-btn" onClick={() => navigate("/home")}>
            Create Account
            </button>
            </div>
        </div>
    )
    }

export default Auth