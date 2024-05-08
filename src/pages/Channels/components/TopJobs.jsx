
import React from 'react'
import ComponentCard from './ComponentCard';
import JobFigure from './JobFigure';

function TopJobs() {
  return (
    <ComponentCard componentClassName={`topJobs-card card`}>
        <span className='card__heading'>Top Jobs</span>
        <div className="jobs__card">
            <JobFigure />
            <JobFigure />
            <JobFigure />
            <JobFigure />
            <JobFigure />
            <JobFigure />
        </div>
    </ComponentCard>
  )
}

export default TopJobs;
