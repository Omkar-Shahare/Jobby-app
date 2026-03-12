import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import './index.css'
import Header from '../header';

const Home = () => {

    let token = Cookies.get("myToken");

    let navigate = useNavigate();

    useEffect(() => {

        if (token === undefined) {

            navigate("/login");
        }
    }, []);



    return (

        <div className='main-cont'>

            <Header />

            <div className='inner-cont'>
                <div className='in-cont'>

                    <h1 style={{ color: "red" }}>Find The Job That Fits Your Life</h1>

                    <br /><br />

                    <h6>Millions of people are searching for jobs, salary information, company reviews. Find the job that fits your abilities and potential.</h6>

                    <br /><br />

                    <Link to="/jobs" className=" btn btn-primary p-3"> Find Jobs</Link>
                </div>
            </div>
        </div>

    )
}

export default Home;