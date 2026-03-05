import { useParams } from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../header'
import { FaStar, FaBriefcase } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import './index.css'
import { useEffect, useState } from 'react'

const JobsItemDetails = () => {
  const { id } = useParams()
  const token = Cookies.get('myToken')

  const [jobDetails, setJobDetails] = useState(null)
  const [skills, setSkills] = useState([])
  const [lifeAtCompany, setLifeAtCompany] = useState(null)
  const [similarJobs, setSimilarJobs] = useState([])

  useEffect(() => {
    const fetchJobsDetails = async () => {
      const api = `https://apis.ccbp.in/jobs/${id}`

      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      try {
        const response = await fetch(api, options)
        const data = await response.json()

        if (response.ok) {
          setJobDetails(data.job_details)
          setSkills(data.job_details.skills)
          setLifeAtCompany(data.job_details.life_at_company)
          setSimilarJobs(data.similar_jobs)

        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchJobsDetails()
  }, [id, token])

  // 🔐 Prevent crash before API loads
  if (jobDetails === null || lifeAtCompany === null) {
    return <p>Loading...</p>
  }

  return (
    <div className="job-details-bg">
      <Header />

      <div className="job-details-container">
        {/* Job Details Card */}
        <div className="job-card">
          <div className="job-header d-flex align-items-center">
            <img
              src={jobDetails.company_logo_url}
              alt="company logo"
              className="company-logo"
            />
            <div className='ml-3'>
              <h2 className="job-title">{jobDetails.title}</h2>
              <p className="job-rating"><FaStar className="star-icon" /> {jobDetails.rating}</p>
            </div>
          </div>

          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mt-4 mb-3">
            <div className="job-meta d-flex align-items-center mb-3 mb-md-0">
              <FaLocationDot className='job-meta-icon mr-2' />
              <span>{jobDetails.location}</span>
              <FaBriefcase className='job-meta-icon mr-2 ml-4' />
              <span>{jobDetails.employment_type}</span>
            </div>
            <p className="package-salary m-0">{jobDetails.package_per_annum}</p>
          </div>

          <hr className="my-4" />

          <div className="description-header d-flex justify-content-between align-items-center mb-3">
            <h3 className="section-title m-0">Description</h3>
            <a
              href={jobDetails.company_website_url}
              target="_blank"
              rel="noreferrer"
              className="visit-link"
            >
              Visit <i className="ml-1">↗</i>
            </a>
          </div>

          <p className="description-text">{jobDetails.job_description}</p>

          {/* Skills */}
          <h3 className="section-title">Skills</h3>
          <ul className="skills-list">
            {skills.map(skill => (
              <li key={skill.name} className="skill-item">
                <img src={skill.image_url} alt={skill.name} className="skill-image" />
                <p className="skill-name">{skill.name}</p>
              </li>
            ))}
          </ul>

          {/* Life at Company */}
          <h3 className="section-title">Life at Company</h3>
          <div className="life-at-company">
            <p className="description-text">{lifeAtCompany.description}</p>
            <img
              src={lifeAtCompany.image_url}
              alt="life at company"
              className="life-image"
            />
          </div>
        </div>

        {/* Similar Jobs */}
        <h2 className="similar-heading">Similar Jobs</h2>
        <ul className="similar-jobs-list">
          {similarJobs.map(job => (
            <li key={job.id} className="similar-job-card">
              <div className="job-header d-flex align-items-center mb-3">
                <img
                  src={job.company_logo_url}
                  alt="company logo"
                  className="company-logo"
                />
                <div className='ml-3'>
                  <h3 className="job-title" style={{ fontSize: '20px' }}>{job.title}</h3>
                  <p className="job-rating m-0"><FaStar className="star-icon" /> {job.rating}</p>
                </div>
              </div>

              <p className="description-text mb-4 mt-2" style={{ flex: 1 }}>{job.job_description}</p>

              <div className="job-meta d-flex justify-content-between align-items-center mt-auto">
                <div className="d-flex align-items-center">
                  <FaLocationDot className='job-meta-icon mr-1' />
                  <span>{job.location}</span>
                </div>
                <div className="d-flex align-items-center">
                  <FaBriefcase className='job-meta-icon mr-1 ml-3' />
                  <span>{job.employment_type}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default JobsItemDetails
