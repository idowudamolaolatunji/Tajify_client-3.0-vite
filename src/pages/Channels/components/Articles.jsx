import React from 'react'
import ComponentCard from './ComponentCard'
import ArticleFigure from './ArticleFigure'

function Articles() {
  return (
    <ComponentCard>
        <span className="available__heading heading">Available Skills</span>
        <div className="article__card">
            <ArticleFigure />
            <ArticleFigure />
        </div>
    </ComponentCard>
  )
}

export default Articles
