import React from "react";
import FeaturedArticleFigure from './FeaturedArticleFigure';

import article3 from '../../../assets/images/pngs/article3.png';
import article4 from '../../../assets/images/pngs/article4.png';
import article5 from '../../../assets/images/pngs/article5.png';
import { Link } from "react-router-dom";
const FeaturedArticleData = [
    {
        title: 'The Great AI Disruption: Six Startling Predictions That Will Shape Our Lives and Test.',
        text: 'As we rapidly advance into an AI-driven world, our lives are becoming more intertwined with artificial..',
        time: '12:23AM',
        imagePath: article3
    },
    {
        title: 'The Great AI Disruption: Six Startling Predictions That Will Shape Our Lives and Test.',
        text: 'As we rapidly advance into an AI-driven world, our lives are becoming more intertwined with artificial..',
        time: '12:23AM',
        imagePath: article4
    },
    {
        title: 'The Great AI Disruption: Six Startling Predictions That Will Shape Our Lives and Test.',
        text: 'As we rapidly advance into an AI-driven world, our lives are becoming more intertwined with artificial..',
        time: '12:23AM',
        imagePath: article5
    },
]
function FeaturedArticles() {
    return (
        <div className="featured-articles">
            <h3 className="heading__tetariary">Featured Articles</h3>
            
            <div className="feacture-articles__cards">
                {FeaturedArticleData.map(article => {
                    return <FeaturedArticleFigure key={article.imagePath} title={article.title} imagePath={article.imagePath} text={article.text} time={article.time} />
                })}
            </div>
            <Link to={'/coming-soon'} className='view-more'>view more...</Link>
        </div>
    );
}

export default FeaturedArticles;