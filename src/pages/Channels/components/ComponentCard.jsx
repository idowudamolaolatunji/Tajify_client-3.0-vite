import React from 'react'

function ComponentCard({ children, componentClassName }) {
  return (
    <div className={`component-card ${componentClassName}`}>
      {children}
    </div>
  )
}

export default ComponentCard;
