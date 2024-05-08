import React from 'react';


function QuickFigure({ feedQuick, userImage }) {
  return (
    <div className="quicks__box">
        <div className="main_img">
            <img src={feedQuick} alt={feedQuick} />
        </div>
        <div className="sub_img image-box">
            <img src={userImage} alt={userImage} />
        </div>
    </div>
  )
}

export default QuickFigure;
