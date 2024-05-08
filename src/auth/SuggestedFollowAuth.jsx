import React from 'react';
import SuggestedFollowImg from '../../assets/images/pngs/suggested-follow.png';
import FollowItem from '../FollowItem';


function SuggestedFollowAuth () {
    return (
        <div className="suggested-follow__container suggested-follow">
            <div className="auth__modal modal">
                <img className="modal__image" src={SuggestedFollowImg} alt="design image" />
                <div className="modal__content-box">
                    <div className="follow__box">
                        <div className="follow__box--head">
                            <p className="follow__heading">People to follow</p>
                            <button className="follow-head__button continue">Continue</button>
                        </div>
                        <div className="follow__box--body">
                           <FollowItem />
                           <FollowItem />
                           <FollowItem />
                           <FollowItem />
                           <FollowItem />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SuggestedFollowAuth;