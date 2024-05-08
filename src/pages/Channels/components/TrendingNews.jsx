import React from 'react';

import ComponentCard from './ComponentCard';
import NewsFigure from './NewsFigure';


function TrendingNews() {
  return (
    <ComponentCard componentClassName={`trendingNews-card card-m`}>
        <span className='card__heading'>Trending News</span>
        <div className="news__cards">
            <NewsFigure />
            <NewsFigure />
            <NewsFigure />
        </div>
    </ComponentCard>
  )
}

export default TrendingNews;
