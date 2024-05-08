import React, { useState, useEffect } from 'react'
import ComponentCard from './ComponentCard';

import { MdOutlineEmojiEmotions } from 'react-icons/md';
import { BiVideo, BiImage } from 'react-icons/bi';
import { FaMicrophoneLines } from 'react-icons/fa6';
import { IoLocationOutline } from 'react-icons/io5';
import { CgAttachment } from 'react-icons/cg';
import { AiOutlineClose } from "react-icons/ai";

const newsFeedStyle = {
	width: "50rem",
	transition: "all .35s ease-in",
};

function PostFeed({ user }) {
    const [showPostModal, setShowPostModal] = useState(false);

    function handleShowModal() {
        setShowPostModal(true);
    }

    function handleCloseModal() {
		setShowPostModal(false);
	}

    

    return (
        <>
            {showPostModal && user ?
            
            <div className="overlay">
                <div className="modal" style={newsFeedStyle}>
                    <span className="modal--head">
                        <p className="post-heading">Post Content</p>
                        <AiOutlineClose className="modal--icon" onClick={handleCloseModal} />
                    </span>
                    <div className="modal__content">
                        <span className="post-feed-post post-inModal">
                            <img alt={user?.image} src={user?.image} />
                            <textarea placeholder="Share what you're thinking..."></textarea>
                            <MdOutlineEmojiEmotions />
                        </span>

                        <span className="post-feed-tools tools-inModal">
                            <span className="post-feed-tool">
                                <FaMicrophoneLines />
                                <p>Audio</p>
                            </span>
                            <span className="post-feed-tool">
                                <IoLocationOutline />
                                <p>Location</p>
                            </span>
                            <span className="post-feed-tool">
                                <BiImage />
                                <p>Photo</p>
                            </span>
                            <span className="post-feed-tool">
                                <CgAttachment />
                                <p>Document</p>
                            </span>
                            <span className="post-feed-tool">
                                <BiVideo />
                                <p>Video</p>
                            </span>

                            <button className="button post__button">Post</button>
                        </span>
                    </div>
                </div>
            </div> : ''
            }
            

            <ComponentCard componentClassName={`post-feed__card`}>
                <span className='post-feed-post'>
                    <img alt={user.image} src={user.image} />
                    <textarea onFocus={handleShowModal} placeholder="Share what you're thinking..."></textarea>
                    <MdOutlineEmojiEmotions onClick={setShowPostModal} />
                </span>
                <span className='post-feed-tools' onClick={setShowPostModal}>
                    <span className='post-feed-tool'><FaMicrophoneLines /><p>Audio</p> </span>
                    <span className='post-feed-tool'><IoLocationOutline /><p>Location</p> </span>
                    <span className='post-feed-tool'><BiImage /><p>Photo</p> </span>
                    <span className='post-feed-tool'><CgAttachment /><p>Document</p> </span>
                    <span className='post-feed-tool'><BiVideo /><p>Video</p> </span>

                    {/* <button className='button post__button'>Post</button> */}
                </span>
            </ComponentCard>
        </>
    )
}

export default PostFeed;
