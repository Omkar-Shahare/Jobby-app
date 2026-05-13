import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './index.css'

const Login = () => {
    const [allValues, setValues] = useState({
        username: "",
        password: "",
        errorMsg: "",
        successMsg: ""
    });
    const [isSignup, setIsSignup] = useState(false); // Toggle state

    const navigate = useNavigate();
    let token = Cookies.get("myToken");

    useEffect(() => {
        if (token !== undefined) {
            navigate("/");
        }
    }, []);

    const onSubmitForm = async (e) => {
        e.preventDefault();

        // Use correct endpoint based on mode
        const api = isSignup 
            ? "http://localhost:8080/api/auth/signup" 
            : "http://localhost:8080/api/auth/login";

        const userDetails = {
            username: allValues.username,
            password: allValues.password
        }

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userDetails)
        }

        try {
            const response = await fetch(api, options);
            const data = await response.json();

            if (response.ok === true) {
                if (isSignup) {
                    // Reset form and switch to login mode cleanly
                    setValues({ username: "", password: "", errorMsg: "", successMsg: "Registration successful! Please login." });
                    setIsSignup(false); 
                } else {
                    setValues({ ...allValues, errorMsg: "", successMsg: "" });
                    Cookies.set("myToken", data.jwt_token, { expires: 30 }); // Store JSON Web Token
                    navigate("/");
                }
            } else {
                setValues({ ...allValues, errorMsg: data.error_msg || data.errorMsg || "An error occurred", successMsg: "" });
            }
        } catch (error) {
            setValues({ ...allValues, errorMsg: "Cannot connect to server. Is Spring Boot running?", successMsg: "" });
            console.log(error);
        }
    }

    const toggleMode = () => {
        setIsSignup(!isSignup);
        // Clear errors and success messages on toggle
        setValues({ ...allValues, errorMsg: "", successMsg: "" });
    }

    return (
        <div className='form-cont'>
            <h1 style={{ color: "red" }}>{isSignup ? "Sign Up" : "Login Component"}</h1>
            <form className="border border-primary p-3 login-form" onSubmit={onSubmitForm}>

                <div className="form-group mb-3">
                    <label htmlFor="exampleInputEmail1">Username / Email</label>
                    <input type="text" className="form-control" id="exampleInputEmail1"
                        onChange={(e) => (setValues({ ...allValues, username: e.target.value }))}
                        value={allValues.username}
                        aria-describedby="emailHelp" required />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your data with anyone else.</small>
                </div>
                
                <div className="form-group mb-3">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control"
                        onChange={(e) => (setValues({ ...allValues, password: e.target.value }))}
                        value={allValues.password}
                        id="exampleInputPassword1" required />
                </div>

                {allValues.errorMsg && <p className="text-danger mt-2">{allValues.errorMsg}</p>}
                {allValues.successMsg && <p className="text-success mt-2">{allValues.successMsg}</p>}

                <button type="submit" className="btn btn-primary w-100 mt-2">
                    {isSignup ? "Sign Up" : "Submit"}
                </button>
                
                <p className="mt-3 text-center">
                    {isSignup ? "Already have an account?" : "Don't have an account?"}
                    <button type="button" className="btn btn-link p-0 ms-1" onClick={toggleMode}>
                        {isSignup ? "Login here" : "Sign up here"}
                    </button>
                </p>
            </form>
        </div>
    )
}

export default Login;