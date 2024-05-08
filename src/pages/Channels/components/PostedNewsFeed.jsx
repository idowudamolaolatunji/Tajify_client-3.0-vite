import React from 'react'
import ComponentCard from './ComponentCard';

import { AiOutlineFolderAdd, AiOutlineHeart } from 'react-icons/ai';
import { BiSolidShareAlt, BiTime, BiDotsVerticalRounded } from 'react-icons/bi';
import { FaHandHoldingDollar } from 'react-icons/fa6';


function PostedNewsFeed({ userImage}) {
  return (
    <ComponentCard componentClassName={`postedFeed-card card`}>
        <div className="posted--feed">
            <div className="feed__header">
                <div className="feed--author">
                    <div className="image-box">
                        <img src={userImage} alt={userImage} />
                    </div>
                    <div className="feed--info">
                        <p className="feed--author-name">Jide Mobo</p>
                        <div className="date feed--date">
                            <BiTime />
                            <span> 23 Mins ago</span>
                        </div>
                    </div>
                </div>

                <div className="feed--menu-icon">
                    <BiDotsVerticalRounded />
                </div>
                
            </div>
            <div className="feed--content">
                <span className="feed--quotes">"Creativity Spurs Productivity"</span>
                <p className='feed--text'>
                    Are you looking to dive into a niche of creative animator designers, where you create amazing 3D animations. Click on the button to buy my 3D Animation Course.
                </p>
                <p className="feed--hash">
                    #stayproductive #3danimation #course #designers
                </p>
            </div>
            <div className="feed__footer">
                <input type="text" name="comment" className="feed--comment" placeholder="Write Comment.." />
                <span className="feed--reactions">
                    <AiOutlineHeart />
                    <BiSolidShareAlt />
                    <FaHandHoldingDollar />
                    <AiOutlineFolderAdd />
                </span>
                <button className="feed--buy">Post Comment</button>
            </div>
        </div>
    </ComponentCard>
  )
}

export default PostedNewsFeed;
