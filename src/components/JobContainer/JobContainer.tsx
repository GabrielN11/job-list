import React, {useState, useEffect, useContext} from 'react'
import Job from '../../models/Job'
import styles from './JobContainer.module.css'
import parse from 'html-react-parser';
import { GlobalContext } from '../../Context';

type Props = {
    job: Job
}


export default function JobContainer(props: Props) {
    const [job, setJob] = useState<Job>(props.job)
    const [description, setDescription] = useState<string>(props.job.jobDescription)
    const {activeJob} = useContext(GlobalContext)
    useEffect(() => {
        if(activeJob){
            setJob(activeJob)
            setDescription(activeJob.jobDescription)
        }
    }, [activeJob])
    return (
        <div className={styles.container}>
            <div>
                <h3>{job.jobTitle}</h3>
                <p>{job.companyName}</p>
                <p>{job.location}</p>
                <p>{job.salary}</p>
            </div>
            <div className={styles.description}>
                <h3>Job Description</h3>
                <div>{parse(description)}</div>
            </div>
        </div>
    )
}