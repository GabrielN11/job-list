import React, { useContext } from 'react'
import styles from './Filter.module.css'
import FilterButton from './FilterButton'
import {GlobalContext} from '../../Context'

type Props = {
    fetchJobs: (numJobs: number | null, orderByCompanyName: boolean | null, orderByDate: boolean | null) => void,
    fullyLoaded: boolean
}

function Filter(props: Props) {

  const {setFilters, filters} = useContext(GlobalContext)

  //this function trigger the call to filter the jobs by company name
 function filterByCompanyName(){
  //update the filter state from the context api and call the fetchJobs function
  setFilters((current: any) => {
    props.fetchJobs(null, !current.orderByCompanyName, null)
    return {
      orderByDate: false,
      orderByCompanyName: !current.orderByCompanyName
    }
  })
 }

 //this function trigger the call to filter the jobs from date
 function filterByDate(){
  //update the filter state from the context api and call the fetchJobs function
  setFilters((current: any) => {
    props.fetchJobs(null, null, !current.orderByDate)
    return {
      orderByCompanyName: false,
      orderByDate: !current.orderByDate
    }
  })
 }

  return (
    <div className={styles.filter}>
        <p className={styles.label}>Filter by: </p>
        <FilterButton label='Company Name' action={filterByCompanyName} active={filters.orderByCompanyName}/>
        <FilterButton label='Last 7 Days' action={filterByDate} active={filters.orderByDate}/>
    </div>
  )
}

export default Filter