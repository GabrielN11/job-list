import type { NextApiRequest, NextApiResponse } from 'next'
import Job from '../../../src/models/Job'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Job[]>
) {
    //Checks if the requested number of jobs are a string, if not returns the default number of 20 jobs
    const numJobs = ((typeof req.query.numJobs === 'string' && req.query.numJobs !== '') && parseInt(req.query.numJobs)) || 10
    //Check if there is filters and save them in the constants
    const orderByCompanyName = req.query.orderByCompanyName === 'true' ? true : false
    const orderByDate = req.query.orderByDate === 'true' ? true : false
    try{
        let data = await getJobs(numJobs);
        //sort alphabetically by company name
        if(orderByCompanyName){
            data.sort((a, b) => a.companyName.localeCompare(b.companyName))
        }
        else if(orderByDate){

            const currentDate = new Date()
            const SevenDaysAgo = new Date(currentDate.setDate(currentDate.getDate() - 7))
            //filters the data, returning only the jobs within the last 7 days
            data = data.filter(job => {
                return new Date(job.postingDate) >= SevenDaysAgo
            })
            //sort the jobs by date
            data.sort(function (a, b) {
                return new Date(b.postingDate).getDate() - new Date(a.postingDate).getDate()
            });
        }
        return res.status(200).json(data)
    }catch(e){
        return res.status(500)
    }
}

//function to access the API
export async function getJobs(num: number = 20): Promise<Job[]> {
    try {
        //gets the data from the api using the informed payload
        const resp = await fetch('https://www.zippia.com/api/jobs/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                "companySkills": true,
                "dismissedListingHashes": [],
                "fetchJobDesc": true,
                "jobTitle": "Business Analyst",
                "locations": [],
                "numJobs": num,
                "previousListingHashes": []
            })
        })
        const data = await resp.json();
        //returns the data that will be used
        return data.jobs.map((job:any): Job => {
            return {
                jobId: job.jobId,
                jobTitle: job.jobTitle,
                jobDescription: job.jobDescription,
                companyName: job.companyName,
                salary: job.estimatedSalary,
                location: job.location,
                postingDate: job.postingDate,
                postedDate: job.postedDate
            }
        })
        
    } catch (e) {
        throw 'Connection failed.'
    }
}