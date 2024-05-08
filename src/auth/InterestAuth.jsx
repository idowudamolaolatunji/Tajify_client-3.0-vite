import React from 'react';
import interestsImg from '../../assets/images/pngs/interests.png';
import {IoIosClose} from 'react-icons/io'
import { Link } from 'react-router-dom';


function InterestAuth () {
    return (
        <div className="interest__container interest">
            <div className="auth__modal modal">
                <img className="modal__image" src={interestsImg} alt="design image" />
                <div className="modal__content-box">
                    <h4 className="content__header">Interests</h4>
                    <p className="content__description">
                        Choose up to 6 Interests.
                    </p>
                    <span className="intrest-input-box">
                        <input type="text" className="interest__input" placeholder='' />
                        <IoIosClose className='interest__icon'/>
                    </span>
                    <div className="interests">
                        <span className="interest">Dogs</span>
                        <span className="interest">cats</span>
                        <span className="interest">programming</span>
                        <span className="interest">maths</span>
                        <span className="interest">cars</span>
                    </div>
                    <div className="modal__actions">
                        <Link to="/login">

                        <button className="modal__button continue">Continue</button>
                        </Link>
                        <button className=" resend">Skip</button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default InterestAuth