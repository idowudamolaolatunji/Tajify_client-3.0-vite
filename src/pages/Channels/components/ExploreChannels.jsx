import React from 'react'
import ComponentCard from './ComponentCard';

import User1 from '../../../assets/images/pngs/user1.png';
import User2 from '../../../assets/images/pngs/user2.png';

function ExploreChannels() {
  return (
    <ComponentCard componentClassName={`explore-card card-m`}>
        <span className='card__heading'>Explore Channels</span>
        <div className="channel__cards">
        <div className="channel--figure">
            <div className="channel--figure-img">
                <img src={User2} alt={User2} />
            </div>
            <p className='channel--figure-text'>TheBillionaire</p>
        </div>
        <div className="channel--figure">
            <div className="channel--figure-img">
                <img src={User2} alt={User2} />
            </div>
            <p className='channel--figure-text'>Creative Lodge</p>
        </div>
        <div className="channel--figure">
            <div className="channel--figure-img">
                <img src={User1} alt={User1} />
            </div>
            <p className='channel--figure-text'>WWE Lovers</p>
        </div>
        <div className="channel--figure">
            <div className="channel--figure-img">
                <img src={User1} alt={User1} />
            </div>
            <p className='channel--figure-text'>Koders</p>
        </div>
        <div className="channel--figure">
            <div className="channel--figure-img">
                <img src={User2} alt={User2} />
            </div>
            <p className='channel--figure-text'>Jupiter</p>
        </div>
        <div className="channel--figure">
            <div className="channel--figure-img">
                <img src={User2} alt={User2} />
            </div>
            <p className='channel--figure-text'>WealthFix</p>
        </div>
        </div>
    </ComponentCard>
  )
}

export default ExploreChannels;
