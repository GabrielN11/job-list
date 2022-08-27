import React, { useState } from 'react'
import styles from './LoadMore.module.css'

type Props = {
    loadMore: () => void
    fullyLoaded: boolean
}

export default function LoadMore({loadMore, fullyLoaded}: Props) {
    if(fullyLoaded) return null
  return (
    <button className={styles.load_more} onClick={loadMore}>
        Load more
    </button>
  )
}