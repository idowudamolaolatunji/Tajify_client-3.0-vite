import React from 'react'
import ComponentCard from './ComponentCard';
import GigFigure from './GigFigure';


function TopGigs() {
  return (
    <ComponentCard>
        <span className='gigs__heading'>Trending Gigs</span>
        <GigFigure />
        <GigFigure />
    </ComponentCard>
  )
}

export default TopGigs;
