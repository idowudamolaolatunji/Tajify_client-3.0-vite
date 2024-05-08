import React from 'react';
import { HiOutlineUsers } from 'react-icons/hi';

import { IoHomeOutline } from "react-icons/io5";
import { PiVideoCamera } from 'react-icons/pi';
import { RiUserReceivedLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../context/AuthContext';


function LeftSideBar() {

    const navigate = useNavigate();
    const { user } = useAuthContext();

    return (
        <div className="left-sidebar">

            <div className="sidebar--top">
                <span className="side--item" onClick={() => navigate('/profile')}>
                    {console.log(user)}
                    <img src={user?.image} alt={user?.slug} />
                    <p>Profile</p>
                </span>
                <span className="side--item">
                    <IoHomeOutline className='side--icon' />
                    {/* IoHome  */}
                    <p>For You</p>
                </span>
                <span className="side--item">
                    <RiUserReceivedLine className='side--icon' />
                    {/* RiUserReceivedFill  */}
                    <p>Followings</p>
                </span>
                <span className="side--item">
                    <HiOutlineUsers className='side--icon' />
                    {/* HiUsers  */}
                    <p>Friends</p>
                </span>
                <span className="side--item" onClick={navigate('/live/xyz')}>
                    <PiVideoCamera className='side--icon' />
                    {/* PiVideoCameraFill   */}
                    <p>Live</p>
                </span>
            </div>

            <hr />

            <p style={{ margin: '-1rem 0 0 1.2rem'}}>Following Creators</p>
            <div className="sidebar--bottom">

                <div className="side--user">
                    <img src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/eb3e193b8fe45b2bccbc5a470d60a155~c5_100x100.jpeg?lk3s=a5d48078&x-expires=1711126800&x-signature=M7GlLPo8mQmaCiPthEEmYeRime4%3D" alt="" />

                    <span>
                        <p className="">@symply.honeydee</p>
                        <p className="">🦋💛💜HONEYDEE💜💛🦋</p>
                    </span>
                </div>
                <div className="side--user">
                    <img src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/eb3e193b8fe45b2bccbc5a470d60a155~c5_100x100.jpeg?lk3s=a5d48078&x-expires=1711126800&x-signature=M7GlLPo8mQmaCiPthEEmYeRime4%3D" alt="" />

                    <span>
                        <p className="">@symply.honeydee</p>
                        <p className="">🦋💛💜HONEYDEE💜💛🦋</p>
                    </span>
                </div>
                <div className="side--user">
                    <img src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/eb3e193b8fe45b2bccbc5a470d60a155~c5_100x100.jpeg?lk3s=a5d48078&x-expires=1711126800&x-signature=M7GlLPo8mQmaCiPthEEmYeRime4%3D" alt="" />

                    <span>
                        <p className="">@symply.honeydee</p>
                        <p className="">🦋💛💜HONEYDEE💜💛🦋</p>
                    </span>
                </div>
                <div className="side--user">
                    <img src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/eb3e193b8fe45b2bccbc5a470d60a155~c5_100x100.jpeg?lk3s=a5d48078&x-expires=1711126800&x-signature=M7GlLPo8mQmaCiPthEEmYeRime4%3D" alt="" />

                    <span>
                        <p className="">@symply.honeydee</p>
                        <p className="">🦋💛💜HONEYDEE💜💛🦋</p>
                    </span>
                </div>
                <div className="side--user">
                    <img src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/eb3e193b8fe45b2bccbc5a470d60a155~c5_100x100.jpeg?lk3s=a5d48078&x-expires=1711126800&x-signature=M7GlLPo8mQmaCiPthEEmYeRime4%3D" alt="" />

                    <span>
                        <p className="">@symply.honeydee</p>
                        <p className="">🦋💛💜HONEYDEE💜💛🦋</p>
                    </span>
                </div>
            </div>

        </div>
    )
}

export default LeftSideBar
