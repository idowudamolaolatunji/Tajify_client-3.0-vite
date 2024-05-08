import React from 'react';

import User1 from '../../../assets/images/pngs/user1.png';
import User2 from '../../../assets/images/pngs/user2.png';
import { BiTime } from 'react-icons/bi';

function NewsFigure() {
  return (
    <figure className="news--figure">
        <div className="news__img">
            <img src={User1} alt={User1} />
        </div>
        <div className="news__content">
            <p className='news--title'>Indonesia fans kick after...</p>
            <p className='news--details'>Indonesian fans of Lionel Messi expressed dismay Friday after.... </p>
            <span className="date news--date">
            <BiTime /> 12:23AM
            </span>
        </div>
    </figure>
  )
}

export default NewsFigure
