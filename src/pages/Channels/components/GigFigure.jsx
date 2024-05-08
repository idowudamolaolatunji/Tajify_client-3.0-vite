import React from 'react'

function GigFigure() {
  return (
    <div className="gig--figure">
        <div className="gig--title">
            <h3>2min Voice Over for yoga purpose</h3>
            <span className="gig-price">$10</span>
        </div>
        <div className="time_level">
            <p>Fixed Price - Intermediate Level</p>
            <p>
            <i className="fi fi-br-clock-three" /> 23 Mins ago
            </p>
        </div>
        <div className="text_button">
            <div className="text">
            We are looking for a talented voiceover artist to create a 2-minute
            video for yoga lovers. The video should feature a calming tone and be
            in US, Canadian....
            <em className="green">View More</em>
            </div>
            <div className="button">
            <button>Apply</button>
            </div>
        </div>
    </div>
  )
}

export default GigFigure
