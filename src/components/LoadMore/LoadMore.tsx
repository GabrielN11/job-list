import React, { useContext, useState } from 'react'
import styles from './LoadMore.module.css'
import {GlobalContext} from '../../Context'

type Props = {
    fetchJobs: (numJobs: number | null, orderByCompanyName: boolean | null, orderByDate: boolean | null) => void,
    fullyLoaded: boolean
}

export default function LoadMore({fetchJobs, fullyLoaded}: Props) {

  //get the filters state from the context api to respect the filters while loading more items
  const {filters} = useContext(GlobalContext)

  //this function triggers the call to load more jobs
  function load(){
    fetchJobs(20, filters.orderByCompanyName, filters.orderByDate)
  }

  //if the fullyLoaded state is true, the button shouldn't render
  if(fullyLoaded) return null
  return (
    <button className={styles.load_more} onClick={load}>
        Load more
    </button>
  )
}