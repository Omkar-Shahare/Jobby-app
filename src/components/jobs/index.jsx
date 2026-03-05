import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Link } from "react-router-dom";
import DisplayJobs from '../displayJobs';
import FilterSection from '../filterSection';
import Header from '../header';
import './index.css'


const Jobs = () => {


    let token = Cookies.get("myToken");

    const [allValues, setValues] = useState({
        jobsArr: [],
        empType: [],
        minPakage: "",
        userInput: ""
    });



    let navigate = useNavigate();

    useEffect(() => {

        if (token === undefined) {

            navigate("/login");
        }

        const { empType, minPakage, userInput } = allValues;

        const fetchJobs = async () => {

            const api = `https://apis.ccbp.in/jobs?employment_type=${empType}&salary_ranger=${minPakage}&search=${userInput}`;

            const options = {
                method: "Get",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            try {

                const response = await fetch(api, options);

                const data = await response.json();

                console.log(data);

                if (response.ok === true) {
                    setValues({ ...allValues, jobsArr: data.jobs })
                } else {

                }

            } catch (error) {
                console.log(error);
            }



        }
        fetchJobs();

    }, [allValues.userInput, allValues.empType]);

    const onSearchJobs = (e) => {

        if (e.key === "Enter") {
            setValues({ ...allValues, userInput: e.target.value });

            console.log(allValues.userInput);
        }
    }

    const onChangeEmpType = (value, isChecked) => {

        if (isChecked) {
            //add
            setValues({ ...allValues, empType: [...allValues.empType, value] });
        }
        else {
            //remove from cls
            setValues({ ...allValues, empType: allValues.empType.filter(e => e !== value) });
        }
    }

    return (

        <div className='main-cont'>

            <Header />

            <div className='jobs-container'>

                <div className='search-wrapper'>
                    <input onKeyUp={onSearchJobs} type="text" className="search-input" placeholder='Search your Jobs' />
                </div>

                <div className='jobs-layout'>

                    <div className='filter-wrapper'>
                        <FilterSection onChangeEmpType={onChangeEmpType} />
                    </div>

                    <ul className='jobs-list-wrapper'>
                        {
                            allValues.jobsArr.map(e => <DisplayJobs key={e.id} jobsItems={e} />)
                        }
                    </ul>

                </div>

            </div>

        </div>


    )
}

export default Jobs;