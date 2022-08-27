import React, {createContext, useState} from 'react'
import Job from './models/Job'

interface IGlobalContext{
    activeJob: Job | null,
    changeActiveJob: (job: Job) => void
}

const defaultState = {
    activeJob: null,
    changeActiveJob: (job: Job) => {},
}

export const GlobalContext = createContext<IGlobalContext>(defaultState)

type Props = {
    children: React.ReactNode
}

export const GlobalProvider = ({ children }: Props) => {

    const [activeJob, setActiveJob] = useState<Job | null>(defaultState.activeJob)
    const changeActiveJob = (job: Job):void => {
        setActiveJob(job)
    }

    return (
        <GlobalContext.Provider value={{activeJob, changeActiveJob}}>
            {children}
        </GlobalContext.Provider>
    )
}