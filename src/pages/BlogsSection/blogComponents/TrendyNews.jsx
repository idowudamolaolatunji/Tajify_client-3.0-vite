import React, { useEffect, useState } from 'react'
import SecTitle from '../../../components/SecTitle'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import Img from '../../../assets/images/pngs/sport-img.png';
import { useAuthContext } from '../../../context/AuthContext';

const customStyle = {
    alignItems: 'center',
}

function TrendyNews() {
    const [isLoading, setIsLoading] = useState(true);
    const [trendyBlogs, setTrendyBlogs] = useState([]);
    const trendingPosts = trendyBlogs?.slice(0, 6);
    console.log(trendyBlogs, trendingPosts);

    const { user, token } = useAuthContext();
    
    

    useEffect(function() {
        async function fetchTrendyBlogs() {
            try {
                setIsLoading(true);
                // const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/blogs/trending-posts`, {
                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/blogs`, {
                    // const res = await fetch(`https://newsapi.org/v2/everything?q=nigeria&apiKey=da7b5420e48a4922b5bcc8a33646f28a`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        // Authorization: `Bearer ${token}`,
                    },
                });
                console.log(res)
                if (!res.ok) throw new Error('Something went wrong!');
                const data = await res.json();
                if (data.status !== "success") throw new Error(data.message);
                console.log(data);
                setTrendyBlogs(data.data.blogs);
            } catch (err) {
                console.log(err.message);
            } finally {
                setIsLoading(false);
            }
        }

        fetchTrendyBlogs();
    }, []);


  return (
    <div className='trendy--news'>
        <div className="trendy--top">
            <SecTitle title={'Trendy Blogs'} style={customStyle} />
            {/* <div className="trendy--top-others">
                <span>All</span>
                <span>Filter <MdOutlineKeyboardArrowDown /></span>
            </div> */}
        </div>

        <div className="trendy--grid">
            <figure className="main--trendy-news">
                <img src={`${import.meta.env.VITE_SERVER_ASSET_URL}/blogs/${trendingPosts[0]?.image}`} alt="" />

                <figcaption className='main--trendy-details'>
                    <p className='main--trendy-title'>{trendingPosts[0]?.title}</p>
                    <span className='main--trendy-description'>
                        When Donald Trump responded to his latest by promising to appoint a special prosecutor if he’s reelected to President Joe Biden and his family, he signaled that a second... <span>Read more</span>
                    </span>
                </figcaption>
            </figure>


            <div className="other--trendy-news">
                <figure className='other--trendy-figure'>
                    <img src={`${import.meta.env.VITE_SERVER_ASSET_URL}/blogs/${trendingPosts[2]?.image}`} alt="" />
                    <figcaption>
                        <p className='main--trendy-title'>{trendingPosts[2]?.title}</p>
                        <p>1 hour ago</p>
                    </figcaption>
                </figure>

                {/*  */}
                <figure className='other--trendy-figure'>
                    <img src={`${import.meta.env.VITE_SERVER_ASSET_URL}/blogs/${trendingPosts[3]?.image}`} alt="" />
                    <figcaption>
                        <p className='main--trendy-title'>{trendingPosts[3]?.title}</p>
                        <p>1 hour ago</p>
                    </figcaption>
                </figure>
                <figure className='other--trendy-figure'>
                    <img src={`${import.meta.env.VITE_SERVER_ASSET_URL}/blogs/${trendingPosts[0]?.image}`} alt="" />
                    <figcaption>
                        <p className='main--trendy-title'>{trendingPosts[0]?.title}</p>
                        <p>1 hour ago</p>
                    </figcaption>
                </figure>
                <figure className='other--trendy-figure'>
                    <img src={`${import.meta.env.VITE_SERVER_ASSET_URL}/blogs/${trendingPosts[1]?.image}`} alt="" />
                    <figcaption>
                        <p className='main--trendy-title'>{trendingPosts[1]?.title}</p>
                        <p>1 hour ago</p>
                    </figcaption>
                </figure>
            </div>
        </div>
      
    </div>
  )
}

export default TrendyNews
