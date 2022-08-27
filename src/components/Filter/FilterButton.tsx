import React from 'react'
import styles from './Filter.module.css'

type Props = {
    label: string,
    action: () => void
}

function FilterButton(props: Props) {
  return (
    <button className={styles.button} onClick={props.action}>
        {props.label}
    </button>
  )
}

export default FilterButton