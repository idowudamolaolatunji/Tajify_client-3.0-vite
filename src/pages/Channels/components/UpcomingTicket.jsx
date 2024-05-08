import React from 'react';

import ComponentCard from './ComponentCard';
import TicketFigure from './TicketFigure';

function UpcomingTicket() {
  return (
    <>
        <ComponentCard>
            <span className="upcoming__heading heading">Upcoming Tickets</span>
            <div className="tickets__card">
                <TicketFigure />
                <TicketFigure />
                <p className="more">View More...</p>
            </div>
        </ComponentCard>
    </>
  )
}

export default UpcomingTicket;
