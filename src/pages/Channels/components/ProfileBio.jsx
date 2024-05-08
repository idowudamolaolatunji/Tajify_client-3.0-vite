import React from "react";

import { PiNotePencilFill } from 'react-icons/pi';
import { BiSolidMessageAltDots, BiSolidGift } from 'react-icons/bi';
import { AiOutlineFolderAdd } from 'react-icons/ai';

function ProfileBio ({ user }) {
    return (
        <figure className="profile__container">
            <div className="profile--top">
                <div className="profile--image-box">
                    <img src={user.image} alt={user.image} />
                </div>
            </div>
            <div className="info--figures">
                <div className="user-info userName">
                    <p>{user.fullName || 'My Name'}</p>
                    <em><a href="#">@{user.username}</a></em>
                </div>
                <div className="followers--numbers">
                    <span className="numbers">
                        <p className="numbers-count">{user.followers.length}</p>
                        <p className="numbers-text">Followers</p>
                    </span>
                    <span className="numbers">
                        <p className="numbers-count">{user.following.length}</p>
                        <p className="numbers-text">Following</p>
                    </span>
                </div>
                <div className="info--icons">
                    <div className="info">
                        <span>
                            <PiNotePencilFill className='info--icon' />
                            <p>post</p>
                        </span>
                        <span>
                            <AiOutlineFolderAdd className='info--icon' />
                            <p>saved</p>
                        </span>
                    </div>
                    <div className="info">
                        <span>
                            <BiSolidMessageAltDots className='info--icon' />
                            <p>message</p>
                        </span>
                        <span>
                            <BiSolidGift className='info--icon' />
                            <p>Gift</p>
                        </span>
                    </div>
                </div>
            </div>
            <a href="#" className="profile__button">View Profile</a>
        </figure>
    )
}

export default ProfileBio;