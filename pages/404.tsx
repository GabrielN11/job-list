import { useRouter } from 'next/router'
import React, { useEffect } from 'react'


export default function Index() {
    const navigation = useRouter()

    useEffect(() => {
        navigation.push('/test/jobs');
    }, [])
  return (
    <div></div>
  )
}