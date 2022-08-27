import type { NextPage } from 'next'
import { GlobalProvider } from '../../../src/Context'
import Home from '../../../src/components/Home/Home'
import Head from 'next/head'

//uses getServerSideProps the SSR the first 10 jobs
export async function getServerSideProps(): Promise<any> {
  try {
    const resp = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/jobs')

    const jobs = await resp.json()

    return {
      props: {
        jobs,
      },
    }

  }
  catch (e) {

  }
}

const MainPage: NextPage<any> = (props) => {
  return (
    <GlobalProvider>
      <Head>
        <title>Zippia Job List</title>
        <meta name='description' content='Search for job opportunities, remote jobs and more.'/>
      </Head>
      <Home jobs={props.jobs}/>
    </GlobalProvider>
  )
}

export default MainPage