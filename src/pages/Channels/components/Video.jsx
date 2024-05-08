import React from 'react'

function Video() {

  return (
    <div className="video__item">
        <span className="video__user">
            <img className='video__user--img' src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/eb3e193b8fe45b2bccbc5a470d60a155~c5_100x100.jpeg?lk3s=a5d48078&x-expires=1711126800&x-signature=M7GlLPo8mQmaCiPthEEmYeRime4%3D" alt="" />
            <div className="video--info">
                <span className="video--author">
                    <p className="">@symply.honeydee</p>
                    <span>|</span>
                    <p className="">🦋💛💜HONEYDEE💜💛🦋</p>
                </span>

                <span className="video--content">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius incidunt fugiat similique animi maiores at amet! Consequuntur, est.
                </span>
            </div>
        </span>

        <div className='video'>
            <video style={{ outline: 'none' }} className='video--player' src="https://res.cloudinary.com/dy3bwvkeb/video/upload/v1710941120/Download_byehba.mp4" loop controls></video>
        </div>

        <hr style={{ width: '70%', margin: '2rem 0', height: '1px', backgroundColor: '#ddd', border: 'none' }} />
    </div>
  )
}

export default Video
