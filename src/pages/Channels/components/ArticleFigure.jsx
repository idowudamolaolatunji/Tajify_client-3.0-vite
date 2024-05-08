import React from 'react';
import ArticleImage from '../../../assets/images/pngs/articleImage.png';

function ArticleFigure() {
    return (
        <div className="article--figure">
            <h4 className='article--text'>
                The Great AI Disruption: Six Startling Predictions That Will Shape Our
                Lives and Test O...
            </h4>
            <div className="article-info">
                <div>
                    <img src={ArticleImage} alt={ArticleImage} />
                </div>
                <div className="article-content">
                    <p>
                    As we rapidly advance into an AI-driven world, our lives are
                    becoming more intertwined with artificial..
                    <em>read more...</em>
                    </p>
                    <span className="date">
                    <i className="fi fi-br-clock-three" /> 12:23AM
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ArticleFigure;
