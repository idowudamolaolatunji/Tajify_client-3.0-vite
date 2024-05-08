import React, { useEffect, useState } from 'react';

import Header from "../../components/Header";
import './style.css';
import { useParams } from 'react-router-dom';
import { capitalizeFirstLetter, dateConverter, getInitials } from '../../utils/helper';
import { IoMdHeartEmpty } from "react-icons/io";
import { LiaCommentDotsSolid } from 'react-icons/lia';
import { IoShareOutline } from 'react-icons/io5';
import { RxDotsHorizontal } from "react-icons/rx";
import NotPaidDiv from './components/NotPaidDiv';
import MoreFromCreator from './components/MoreFromCreator';
import RecommendedPosts from '../../components/RecommendedPosts';
import MainSpinner from '../../components/MainSpinner';


function index() {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(true);
    const [blog, setBlog] = useState({});
    const [moreBlogs, setMoreBlogs] = useState([]);
    const [creator, setCreator] = useState({});

    const [scrollLocation, setScrollLocation] = useState(0);
    const [transform, setTransform] = useState(false);

    const { blogSlug } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(function() {
        async function fetchBlog() {
            try {
                setIsLoading(true);

                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/blogs/blog/${blogSlug}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if(!res.ok) throw new Error('Something went wrong!');
                const data = await res.json();
                console.log(res, data);
                if(data.status !== 'success') throw new Error(data.message);
                setBlog(data.data.blog);
                setCreator(data.data.blog.creator)
            } catch(err) {
                console.log(err.message);
            } finally {
                setIsLoading(false)
            }
        }

        fetchBlog();
        window.scrollTo(0, 0);
    }, [blogSlug]);


    useEffect(function() {
        async function fetchBlogMoreByCreator() {
            try {
                setIsLoadingMore(true);

                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/blogs/creator/more/${creator?._id}/${blog?._id}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    }
                });

                if(!res.ok) throw new Error('Something went wrong!');
                const data = await res.json();
                if(data.status !== 'success') throw new Error(data.message);
                console.log(res, data);

                setMoreBlogs(data.data.blogs);
                
            } catch(err) {
                console.log(err.message);
            } finally {
                setIsLoadingMore(false)
            }
        }
        if(creator && blog) fetchBlogMoreByCreator()
    }, [creator, blog])

    useEffect(function () {
		function controlNavbar() {
            const currScrollLocation = window.scrollY;
            setScrollLocation(currScrollLocation);
			// console.log(currScrollLocation, scrollLocation);

            if(currScrollLocation > scrollLocation) {
                setTransform(true)
            } else if (currScrollLocation < scrollLocation) {
                setTransform(false)
            }
		}
		window.addEventListener('scroll', controlNavbar)
		controlNavbar()
		return () => {
			window.removeEventListener('scroll', controlNavbar)
		}
	}, [scrollLocation]);


  return (
    <>
        <Header scrollStyle={transform ? { transform: 'translateY(-100px)' } : { transform: 'translateY(0)' }} /> 

        {isLoading && (
            <MainSpinner />
        )}

        <div className="blog-detail-container">
            <div className="detail-top">
                <h3 className="detail--heading">{blog?.title}</h3>
                <p className='detail--catgeory'><strong>{capitalizeFirstLetter(blog?.category)} blog:</strong> Specifically about {blog?.tags?.join(', ')}</p>

                <div className='detail--user-info'>
                    {(creator?.image) ? (
                        <img className='details--img' src={creator?.image} alt={blog?.author} />
                    ) : (
                        <span className="details__initials img-initials">
                            {getInitials(creator?.fullname)}
                        </span>
                    )}
                    <span className='detail--detail'>
                        <span>
                            <p>{creator?.fullname || creator?.username}</p>
                            <span>&bull;</span>
                            <button className='detail--follow-btn'>Follow</button>
                        </span>

                        <span>
                            {dateConverter(blog?.createdAt, 'blog')}
                        </span>
                    </span>
                </div>

                <div className='detail--actions'>
                    <span>
                        <IoMdHeartEmpty />
                        <LiaCommentDotsSolid />
                    </span>
                    <span>
                        <IoShareOutline />
                        <RxDotsHorizontal />
                    </span>
                </div>
            </div>

            <div className="detail-image">
                <img src={`${import.meta.env.VITE_SERVER_ASSET_URL}/blogs/${blog?.image}`} alt={blog?.title} />
            </div>

            <div className={`detail-content`}>
                {/* make a condition and add a class based on the user is premium and blogpremium and add class(detail-unsubed) */}
                <div dangerouslySetInnerHTML={{ __html: blog?.content }} />
            </div>


            {/* Some conditions should happen here */}
            {/* <NotPaidDiv user={creator} /> */}
            {/* ============================== */}


            


        </div>



        <div className="detail-bottom">
            <div className="blog-detail-container" style={{ margin: '0 auto' }}>
                <span className="detail-bottom--user">
                    {(creator?.image) ? (
                        <img className='buttom--img' src={creator?.image} alt={blog?.author} />
                    ) : (
                        <span className="bottom__initials img-initials">
                            {getInitials(creator?.fullname)}
                        </span>
                    )}
                    <span className='detail-bottom-info'>
                        <span>
                            <p>Written by {creator?.fullname || creator?.username}</p>
                            <button>Follow</button>
                        </span>

                        <span>{2 || 'No'} Followers</span>
                    </span>
                    <p className='detail-bottom-bio'>BIO 🎉: {creator?.bio}</p>
                </span>

                <hr className='hr' />

                {moreBlogs?.length > 0 && <MoreFromCreator creator={creator} moreBlogs={moreBlogs} />}

                <RecommendedPosts currPostId={blog?._id} />
            </div>
        </div>

    </>
  )
}

export default index
