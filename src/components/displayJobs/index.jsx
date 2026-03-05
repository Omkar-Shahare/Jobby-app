import './index.css';
import { FaStar, FaBriefcase } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Jobs from '../jobs';
import { IoPhonePortrait } from 'react-icons/io5';

const DisplayJobs = (props) => {

    const { jobsItems } = props;

    return (
        <Link to={`/jobs/${jobsItems.id}`} className='job-list-card'>

            <div className='job-header-wrapper'>
                <img src={jobsItems.company_logo_url} className="job-logo" alt="company logo" />
                <div className='ml-3'>
                    <h3 className="job-list-title">{jobsItems.title}</h3>
                    <p className="job-list-rating"><FaStar className='star-icon' /> {jobsItems.rating}</p>
                </div>
            </div>

            <div className='job-meta-row'>
                <div className='job-meta-icons'>
                    <FaLocationDot className='job-meta-icon' />
                    <span>{jobsItems.location}</span>
                    <span className="meta-divider">|</span>
                    <FaBriefcase className='job-meta-icon' />
                    <span>{jobsItems.employment_type}</span>
                </div>
                <h5 className="job-salary">{jobsItems.package_per_annum}</h5>
            </div>

            <hr className="my-2" />

            <h4 className="job-desc-title">Description</h4>

            <p className="job-desc-text">{jobsItems.job_description}</p>

        </Link>
    )
}

export default DisplayJobs;