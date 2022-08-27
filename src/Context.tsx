import React, {createContext, useState} from 'react'
import Job from './models/Job'

export type Filters = {
    orderByCompanyName: boolean,
    orderByDate: boolean
}

interface IGlobalContext{
    loading: boolean,
    toggleLoading: (status: boolean) => void,
    activeJob: Job | null,
    changeActiveJob: (job: Job) => void,
    filters: Filters,
    setFilters: (current: any) => any,
}

const defaultState = {
    loading: false,
    toggleLoading: () => {},
    activeJob: null,
    changeActiveJob: () => {},
    filters: {
        orderByCompanyName: false,
        orderByDate: false
    },
    setFilters: () => {},
}

export const GlobalContext = createContext<IGlobalContext>(defaultState)

type Props = {
    children: React.ReactNode
}

export const GlobalProvider = ({ children }: Props) => {

    //this state determines the job that will be displayed on the right
    const [activeJob, setActiveJob] = useState<Job | null>(defaultState.activeJob)

    //this state determines if the loading element is displayed
    const [loading, setLoading] = useState<boolean>(false)

    //function to change the active job state
    const changeActiveJob = (job: Job):void => {
        setActiveJob(job)
    }

    //this state determines which job filter is active
    const [filters, setFilters] = useState<Filters>({
        orderByCompanyName: false,
        orderByDate: false
    })

    //function to change the loading state
    const toggleLoading = (status: boolean) => {
        setLoading(status)
    }


    return (
        <GlobalContext.Provider value={{activeJob, changeActiveJob, loading, toggleLoading, filters, setFilters}}>
            {children}
        </GlobalContext.Provider>
    )
}