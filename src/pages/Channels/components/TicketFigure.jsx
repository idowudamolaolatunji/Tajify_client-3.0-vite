import React from 'react';

import Ticket1 from '../../../assets/images/pngs/Ticket1.png';
import { BiTime } from 'react-icons/bi';

function TicketFigure() {
  return (
    <figure className="ticket--figure">
        <div className="ticket--image">
            <img src={Ticket1} alt={Ticket1} />
        </div>
        <p className='ticket--title'>ThrowBack to the 90's</p>
        <span className='ticket--date'>
            <BiTime />
            Sat, July 1, 2023, 4:00pm
        </span>
        <div className="ticket--price">
            <button className="ticket--button button">Get Ticket</button>
            <p>₦3,000</p>
        </div>
    </figure>
  )
}

export default TicketFigure;
