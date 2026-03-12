import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import './index.css';


const FilterSection = (props) => {

    let token = Cookies.get("myToken");

    const [allValues, setValues] = useState({
        jobsProfile: {}
    });

    const { onChangeEmpType, onChangeSalary } = props;

    const empTypeArr = [
        {
            id: "FULLTIME",
            title: "Full Time"
        },
        {
            id: "PARTTIME",
            title: "Part Time"
        },
        {
            id: "INTERNSHIP",
            title: "Internship"
        },
        {
            id: "FREELANCE",
            title: "Freelance"
        }
    ]

    const salaryTypeArr = [
        {
            id: "1000000",
            title: "10 LPA and above"
        },
        {
            id: "2000000",
            title: "20 LPA and above"
        },
        {
            id: "3000000",
            title: "30 LPA and above"
        },
        {
            id: "4000000",
            title: "40 LPA and above"
        }
    ]

    useEffect(() => {

        const filterJobs = async () => {

            const api = "https://apis.ccbp.in/profile";

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
                    setValues({ ...allValues, jobsProfile: data.profile_details })
                }
            } catch (error) {
                console.log(error);
            }
        };
        filterJobs();
    }, []);

    const displayEmpArr = (each) => {

        const { id, title } = each;

        const onChangeEmp = (e) => {

            onChangeEmpType(e.target.value, e.target.checked);
        }

        return (
            <li key={id}>
                <input type="checkbox" className="checkbox-input" id={each.id} value={each.id} onChange={onChangeEmp} />
                <label className="filter-label" htmlFor={each.id}>{each.title}</label>
            </li>
        )

    }

    const displaySalaryArr = (each) => {

        const { id, title } = each;

        const onSelectSalary = () => {
            onChangeSalary(id);
        }

        return (
            <li key={id}>
                <input type="radio" name="salary" className="radio-input" id={id} value={id} onChange={onSelectSalary} />
                <label className="filter-label" htmlFor={id}>{title}</label>
            </li>
        )

    }


    return (
        <div className='filter-card'>

            <div className='dp'>
                <img src={allValues.jobsProfile.profile_image_url} alt="Profile" className='profile-img' />
                <h3 className='profile-name'>{allValues.jobsProfile.name}</h3>
                <p className='profile-bio'>{allValues.jobsProfile.short_bio}</p>
            </div>

            <hr className="my-4" />

            <h3 className='filter-title'>Type of Employment</h3>

            <ul className='filter-list'>
                {
                    empTypeArr.map(each => displayEmpArr(each))
                }
            </ul>

            <hr className="my-4" />

            <h3 className='filter-title'>Salary Range</h3>

            <ul className='filter-list'>
                {
                    salaryTypeArr.map(each => displaySalaryArr(each))
                }
            </ul>

        </div>
    )
}
export default FilterSection;