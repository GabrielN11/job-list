import React from 'react'
import styles from './Filter.module.css'

type Props = {
    active: boolean,
    label: string,
    action: () => void
}

function FilterButton(props: Props) {
  return (
    <button className={`${styles.button} ${props.active && styles.active_button}`} onClick={() => props.action()}>
        {props.label}
    </button>
  )
}

export default FilterButton