import React from 'react'
import styles from './Filter.module.css'
import FilterButton from './FilterButton'

type Props = {
    toggleOrderByCompany: () => void
    toggleOrderByDate: () => void
}

function Filter(props: Props) {
  return (
    <div className={styles.filter}>
        <FilterButton label='By Company Name' action={props.toggleOrderByCompany}/>
        <FilterButton label='Latest' action={props.toggleOrderByDate}/>
    </div>
  )
}

export default Filter