import type { NextPage } from 'next'
import { getJobs } from '../../../src/utils/api_call'
import Job from '../../../src/models/Job'
import { GlobalProvider } from '../../../src/Context'
import Home from '../../../src/components/Home/Home'

type Props = {
  jobs: Job[]
  error: boolean
}

export async function getServerSideProps(): Promise<{ props: Props }> {
  let error = false;
  let jobs: Job[] = [];
  try {
    jobs = await getJobs(10);
  }
  catch (e) {
    error = true;
  } finally {
    return {
      props: {
        jobs,
        error
      },
    }
  }
}

const MainPage: NextPage<Props> = (props) => {
  return (
    <GlobalProvider>
      <Home jobs={props.jobs}/>
    </GlobalProvider>
  )
}

export default MainPage