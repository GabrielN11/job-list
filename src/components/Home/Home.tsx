import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../Context'
import Job from '../../models/Job'
import Credits from '../Credits/Credits'
import Filter from '../Filter/Filter'
import JobContainer from '../JobContainer/JobContainer'
import JobList from '../JobList/JobList'
import LoadMore from '../LoadMore/LoadMore'

type Props = {
    jobs: Job[]
}

const Home = (props: Props) => {
    const { changeActiveJob, toggleLoading } = useContext(GlobalContext)

    //this state determines the job list
    const [jobs, setJobs] = useState<Job[]>(props.jobs)

    //this state determines the job list is loaded with all the 20 jobs
    const [fullyLoaded, setFullyLoaded] = useState<boolean>(false)

    //this useffect changes the active job whenever the list is filtered
    useEffect(() => {
        changeActiveJob(jobs[0])
    }, [jobs])

    //function to get data from the nodejs api
    async function fetchJobs(numJobs: number | null, orderByCompanyName: boolean | null, orderByDate: boolean | null): Promise<void> {
        toggleLoading(true) //enable the loading element
        const resp = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/jobs?' + new URLSearchParams({
            numJobs: numJobs ? numJobs.toString() : '',
            orderByCompanyName: orderByCompanyName ? 'true' : '',
            orderByDate: orderByDate ? 'true' : ''
        }))
        const data = await resp.json()
        setFullyLoaded((data.length === jobs.length && data.length >=20) ? true : false) // disabled the 'load more' button if all the data is loaded
        setJobs(data) //set a new job list from the api
        toggleLoading(false) //disables he loading element
    }

    return (
        <div>
            <Filter fetchJobs={fetchJobs} fullyLoaded={fullyLoaded}/>
            <JobList jobs={jobs} />
            <LoadMore fetchJobs={fetchJobs} fullyLoaded={fullyLoaded} />
            <JobContainer job={jobs[0]} />
            <Credits/>
        </div>
    )
}

export default Home