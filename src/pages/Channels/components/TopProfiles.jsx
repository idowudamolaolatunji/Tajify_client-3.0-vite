import React from 'react';
import User1 from '../../../assets/images/pngs/user1.png';
import User2 from '../../../assets/images/pngs/user2.png';

import { BiSolidMessageAltDots, BiUserPlus } from 'react-icons/bi'

function TopProfiles() {
  return (
    <div className="topProfiles-card">
        <span className="profile-head">
            <h3>Top Profiles</h3>
            <p>View More...</p>
        </span>

        <div className="top__profiles">
            <div className="profile--figure">
                <div className="profile--image image-box">
                    <img src={User1} alt={User1} />
                </div>
                <div className="profile--text">
                    <p>Adefarati Bukky</p>
                    <em>@Profbukky</em>
                </div>
                <div className="profile--actions">
                    <button className='profile--follow button'><BiUserPlus /> Follow</button>
                    <span className="profile--message">
                        <BiSolidMessageAltDots />
                    </span>
                </div>
            </div>
            <div className="profile--figure">
                <div className="profile--image image-box">
                    <img src={User2} alt={User2} />
                </div>
                <div className="profile--text">
                    <p>Adefarati Bukky</p>
                    <em>@Profbukky</em>
                </div>
                <div className="profile--actions">
                    <button className='profile--follow button'><BiUserPlus /> Follow</button>
                    <span className="profile--message">
                        <BiSolidMessageAltDots />
                    </span>
                </div>
            </div>
            <div className="profile--figure">
                <div className="profile--image image-box">
                    <img src={User1} alt={User1} />
                </div>
                <div className="profile--text">
                    <p>Adefarati Bukky</p>
                    <em>@Profbukky</em>
                </div>
                <div className="profile--actions">
                    <button className='profile--follow button'><BiUserPlus /> Follow</button>
                    <span className="profile--message">
                        <BiSolidMessageAltDots />
                    </span>
                </div>
            </div>

        </div>
    </div>
  )
}

export default TopProfiles;
