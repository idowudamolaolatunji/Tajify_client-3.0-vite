import React from 'react';

import Add from '../../../assets/images/pngs/add-vector.png';
import User1 from '../../../assets/images/pngs/user1.png';
import User2 from '../../../assets/images/pngs/user2.png';
import NewsFeedsQuicks1 from '../../../assets/images/pngs/Rectangle 134.png';
import NewsFeedsQuicks2 from '../../../assets/images/pngs/Rectangle 135.png';
import NewsFeedsQuicks3 from '../../../assets/images/pngs/Rectangle 136.png';

import { useAuthContext } from '../../../context/AuthContext';
import QuickFigure from './QuickFigure';

import AvatarImg from '../../../assets/images/pngs/avatar.png';

function QuickContainer() {
    const { user } = useAuthContext();
  return (
    <div className="quicks__container">
        <div className="quicks__box">
            <div className="main_img quicks__add">&nbsp;</div>
            <div className="sub_img image-box">
                <img src={user?.image || AvatarImg} alt={user?.image || AvatarImg} />
                <img className='sub_add' src={Add} alt={Add} />
            </div>
        </div>
        
        <QuickFigure feedQuick={NewsFeedsQuicks1} userImage={User2} />
        <QuickFigure feedQuick={NewsFeedsQuicks2} userImage={User1} />
        <QuickFigure feedQuick={NewsFeedsQuicks3} userImage={User2} />
    </div>
  )
}

export default QuickContainer;
