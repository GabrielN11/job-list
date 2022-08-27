import Job from '../models/Job'

export async function getJobs(num: number = 20): Promise<any> {
    try {
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