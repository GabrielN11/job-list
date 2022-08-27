import React, { useContext } from 'react'
import { GlobalContext } from '../../Context'
import Job from '../../models/Job'
import JobCard from '../JobCard/JobCard'
import styles from './JobList.module.css'

type Props = {
    jobs: Job[]
}

export default function JobList({jobs}: Props) {
  const {loading} = useContext(GlobalContext) //using the loading state to show or hide the loading element below
  return (
    <ul className={styles.list}>
        {loading && <div className={styles.loading}></div>}
        {jobs.map(job => (
            <JobCard key={job.jobId} job={job}/> //listing all the jobs coming from the props
        ))}
    </ul>
  )
}