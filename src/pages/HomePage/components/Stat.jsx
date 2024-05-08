import React from "react";

function Stat({ figure, text }) {
    return (
        <div className="stat">
            <p className="stat--figure">{figure}</p>
            <p className="stat--text">{text}</p>
        </div>
    );
}

export default Stat;