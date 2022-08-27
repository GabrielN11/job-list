import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../Context'
import Job from '../../models/Job'
import { getJobs } from '../../utils/api_call'
import Filter from '../Filter/Filter'
import JobContainer from '../JobContainer/JobContainer'
import JobList from '../JobList/JobList'
import LoadMore from '../LoadMore/LoadMore'

type Props = {
    jobs: Job[]
}

const Home = (props: Props) => {
    const { changeActiveJob } = useContext(GlobalContext)
    const [jobs, setJobs] = useState<Job[]>(props.jobs)
    const [fullyLoaded, setFullyLoaded] = useState<boolean>(false)
    const [orderByCompany, setOrderByCompany] = useState<boolean>(false)
    const [orderByDate, setOrderByDate] = useState<boolean>(false)

    useEffect(() => {
        console.log(props.jobs)
        changeActiveJob(jobs[0])
    }, [])

    async function loadMore(): Promise<void> {
        const data: Job[] = await getJobs(20)
        setFullyLoaded(true)
        if(orderByCompany){
            setJobs(orderJobsByCompany(data))
        }else if(orderByDate){
            setJobs(orderJobsByDate(data))
        }else{
            setJobs(data)
        }
    }

    function toggleOrderByCompany(): void {
        if (orderByDate) {
            setOrderByDate(false)
            setFullyLoaded(false)
        }
        setOrderByCompany(true)
        const sortedJobs = orderJobsByCompany(jobs)
        setJobs(sortedJobs)
    }

    function toggleOrderByDate(): void {
        if (orderByCompany) setOrderByCompany(false)
        setOrderByDate(true)
        const sortedJobs = orderJobsByDate(jobs)
        setJobs(sortedJobs)
    }

    function orderJobsByCompany(array: Job[]): Job[] {
        array.sort((a, b) => a.companyName.localeCompare(b.companyName))
        return array
    }

    function orderJobsByDate(array: Job[]): Job[] {
        array.sort(function (a, b) {
            return new Date(b.postingDate).getDate() - new Date(a.postingDate).getDate()
        });
        const currentDate = new Date()
        const SevenDaysAgo = new Date(currentDate.setDate(currentDate.getDate() - 7))
        return array.filter(job => {
            return new Date(job.postingDate) >= SevenDaysAgo
        })
    }

    return (
        <div>
            <Filter toggleOrderByCompany={toggleOrderByCompany} toggleOrderByDate={toggleOrderByDate} />
            <JobList jobs={jobs} />
            <LoadMore loadMore={loadMore} fullyLoaded={fullyLoaded}/>
            <JobContainer job={jobs[0]} />
        </div>
    )
}

export default Home