import React, { useContext } from 'react'
import { GlobalContext } from '../../Context'
import Job from '../../models/Job'
import JobCard from '../JobCard/JobCard'
import styles from './JobList.module.css'

type Props = {
    jobs: Job[]
}

export default function JobList({jobs}: Props) {
  return (
    <ul className={styles.list}>
        {jobs.map(job => (
            <JobCard key={job.jobId} job={job}/>
        ))}
    </ul>
  )
}