import React from 'react'

function NotPaidDiv({ user }) {
  return (
    <div className='not-paid-container'>
        {/* <div className="not-paid-blur">&nbsp;</div> */}
        <span className='not-paid-content'>
            <h3>Read this post from {user?.fullname || user?.username} — and all the best blog posts on Tajify.</h3>
            <span>The author made this post available to Tajify members only. Upgrade to instantly unlock this post plus other member-only benefits.</span>

            <ul>
                <li>🎉 Access all member-only blog posts on Tajify</li>
                <li>🎉 Dive deeper into the topics that matter to you</li>
                <li>🎉 Get in-depth articles answering thousands of questions</li>
            </ul>

            <button className='detail--sub-btn'>Upgrade</button>
        </span>
    </div>
  )
}

export default NotPaidDiv
