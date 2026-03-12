import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

import "./index.css";

const Header = () => {
    const navigate = useNavigate();

    const onClickLogout = () => {
        Cookies.remove("myToken");
        navigate("/login");
    }

    return (


        <nav className="d-flex justify-content-between p-3 nav-container">
            <Link to="/" className="text-primary h3 nav-logo">JOBBY</Link>
            <ul className="d-flex nav-links-list">
                <li className="nav-item">
                    <Link to="/" className="p-3 h4 nav-link">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/jobs" className="p-3 h4 nav-link">Jobs</Link>
                </li>
            </ul>

            <button type="button" className="btn btn-primary logout-btn" onClick={onClickLogout}>Logout</button>

        </nav>

    )
}

export default Header;