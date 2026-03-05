import { Link } from "react-router-dom";

import "./index.css";

const Header = () =>{

    return(
        

        <nav className="d-flex justify-content-between p-3">
            <Link to = "/" className=" text-primary h3">JOBBY</Link>
            <ul style={{listStyle :"none"}} className="d-flex">
                <li className="mr-3">
                    <Link to= "/" className="p-3 h4">Home</Link>
                </li>
                <li>
                    <Link to= "/jobs" className="p-3 h4">Jobs</Link>
                </li>
            </ul>

            <Link to = "/login" className=" btn btn-primary">Logout</Link>

        </nav>
        
    )
}

export default Header;