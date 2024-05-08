import React from 'react'
import ListSkeleton from './ListSkeleton';
import { useNavigate } from 'react-router-dom';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { TbCircleDotFilled } from 'react-icons/tb';

function MarketCategorySidebar({ isLoading, categories }) {
    const navigate = useNavigate();
    return (
        <ul className='hero--sidebar'>
            {isLoading && (
                <ListSkeleton />
            )}

            {(categories && categories?.length > 0) && (
                <>
                    {categories?.map(item => <li className='hero--sidebar-item' onClick={() => navigate(`/market/category/${item?.slug}/${item?.categoryName}`)}>
                        <p>
                            <TbCircleDotFilled /> {item?.categoryName} <MdKeyboardDoubleArrowRight className='hero--sidebar-icon' />
                        </p>
                    </li>)}
                </>
            )}
        </ul>
    )
}

export default MarketCategorySidebar;


// Software & Apps
// Design & Multimedia
// Ebook and Audio Book
// Courses & Tutorials
// Stock Photos & Illustrations
// Templates & Tools
// Presentations & Reports
// Manual & How to Guide
// Service Vouchers
// Tickets and Pass


// Gadgets & Electronics
// Home & Office
// Fashion, Health & Beauty
// Foods and Drinks
// Others