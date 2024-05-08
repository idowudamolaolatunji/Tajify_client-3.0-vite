import React from 'react';
import ComponentCard from './ComponentCard';

import User1 from '../../../assets/images/pngs/user1.png';


function AvailiableSkills() {
  return (
    <ComponentCard>
        <span className="available__heading heading">Available Skills</span>
        <div className="skills__cards">
            <div className="skills--figure">
                <div className="skills--figure-img">
                    <img src={User1} alt={User1} />
                </div>
                <p className='skills-text'>Content Creation</p>
            </div>
            <div className="skills--figure">
                <div className="skills--figure-img">
                    <img src={User1} alt={User1} />
                </div>
                <p className='skills-text'>Copy Writing</p>
            </div>
            <div className="skills--figure">
                <div className="skills--figure-img">
                    <img src={User1} alt={User1} />
                </div>
                <p className='skills-text'>WordPress</p>
            </div>
            <div className="skills--figure">
                <div className="skills--figure-img">
                    <img src={User1} alt={User1} />
                </div>
                <p className='skills-text'>Mobile App D.</p>
            </div>
            <div className="skills--figure">
                <div className="skills--figure-img">
                    <img src={User1} alt={User1} />
                </div>
                <p className='skills-text'>UI/UX</p>
            </div>
            <div className="skills--figure">
                <div className="skills--figure-img">
                    <img src={User1} alt={User1} />
                </div>
                <p className='skills-text'>Software Dev.</p>
            </div>
        </div>
    </ComponentCard>
  )
}

export default AvailiableSkills;
