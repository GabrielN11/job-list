import React, { useContext, useEffect, useState } from 'react'
import Job from '../../models/Job'
import styles from './JobCard.module.css'
import parse from 'html-react-parser';
import { GlobalContext } from '../../Context';

type Props = {
    job: Job,
}

export default function JobCard(props: Props) {

    //this state determines the color of the company icon
    const [bgColor, setBgColor] = useState<string>('#000')

    //this state represents a preview of the job description
    const [shortDescription, setShortDescription] = useState<string>('')

    const {changeActiveJob, activeJob} = useContext(GlobalContext)

    useEffect(() => {
        //set a random color for the logo
        setBgColor(randomBgColor())

        //insert the first characters of the job description in the short description state
        setShortDescription(props.job.jobDescription.substring(0, 75) + '...')
    }, [props.job.jobDescription])

    //function to generate a random hsl color for the logo
    function randomBgColor(): string {
        return ' hsl(' + Math.floor(Math.random() * 360) + ', 50%, 40%)';
    }

    return (
        <li className={`${styles.card} ${activeJob?.jobId === props.job.jobId && styles.active_card}`} onClick={() => changeActiveJob(props.job)}>
            <div>
                <div className={styles.logo} style={{ backgroundColor: bgColor }}>
                    <span>{props.job.companyName.substring(0, 1)}</span>
                </div>
            </div>
            <div>
                <h3 className={styles.job_title}>{props.job.jobTitle}</h3>
                <p className={styles.company_title}>{props.job.companyName}</p>
                <p>{props.job.postedDate}</p>
                {/*the parse function inserts the html string from the API in the DOM*/}
                <div>{parse(shortDescription)}</div>
            </div>
        </li>
    )
}