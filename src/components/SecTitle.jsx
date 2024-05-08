import React from 'react'

function SecTitle({ title, style }) {
    return (
        <div className='sec--title' style={style}>
            <p>{title}</p>
        </div>
    )
}

export default SecTitle;
