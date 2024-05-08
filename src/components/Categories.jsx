import React from 'react'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'

function Categories() {
  return (
    <figure className='blog--categories'>
        <span className='card__heading'>Categories</span>

        <ul>
            <li>Fashion <MdOutlineKeyboardArrowRight /></li>
            <li>Sport <MdOutlineKeyboardArrowRight /></li>
            <li>Entertainment <MdOutlineKeyboardArrowRight /></li>
            <li>Education <MdOutlineKeyboardArrowRight /></li>
            <li>Technology <MdOutlineKeyboardArrowRight /></li>
            <li>Travel <MdOutlineKeyboardArrowRight /></li>
            <li>Others <MdOutlineKeyboardArrowRight /></li>
        </ul>
    </figure>
  )
}

export default Categories
