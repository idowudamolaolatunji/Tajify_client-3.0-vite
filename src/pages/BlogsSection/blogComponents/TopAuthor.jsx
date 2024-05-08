import React, { useEffect, useState } from 'react'
import Img from '../../../assets/images/pngs/sport-img.png';
import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';


function TopAuthor() {
  const [isLoading, setIsLoading] = useState(true);
  const [topCreators, setTopCreators] = useState([]);
  const creators = topCreators.slice(0, 4);

  useEffect(function() {
      async function getTopWriters() {
          try {
              setIsLoading(true);
              const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/creator/top-creators`, {
                  method: 'GET',
                  headers: {
                      "Content-Type": "application/json",
                  },
              });
              console.log(res)
              if (!res.ok) throw new Error('Something went wrong!');
              const data = await res.json();
              if (data.status !== "success") throw new Error(data.message);
              console.log(data);
              setTopCreators(data.data.allTopCreators);
          } catch (err) {
              console.log(err.message);
          } finally {
              setIsLoading(false);
          }
      }
    getTopWriters();
  }, [])
  return (
    <section className='top-author--section'>
        <div className="top-author--top">
            <span className="boxy-sec__heading">Top Writers</span>
            <span className='show-more'>Read more <MdOutlineKeyboardDoubleArrowRight /></span>
        </div>
        <div className="top-author--grid">
          {(topCreators && topCreators?.length > 0) && creators?.map(creator => {
            return <img src={creator?.image} alt="" />
          })}
        </div>
      
    </section>
  )
}

export default TopAuthor
