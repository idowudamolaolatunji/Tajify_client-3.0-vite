import React, { useEffect, useState } from "react";
import "../../index.css";
import "../HomePage/main.css";
import Marquee from "react-fast-marquee";

import { useAuthContext } from "../../context/AuthContext";
import Header from '../../components/Header';
import TrendyNews from "./blogComponents/TrendyNews";
import './blogPage.css'

/////////////////////////////////////////
import Img from '../../assets/images/pngs/sport-img.png';
import SpinToWin from "../../assets/images/play-img/SpinToWin.png";
import TopAuthor from "./blogComponents/TopAuthor";
import Categories from "../../components/Categories";
import SecTitle from "../../components/SecTitle";
import { RiCalendarTodoLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import MainSpinner from "../../components/MainSpinner";
const customStyle = {
    alignItems: 'flex-end'
};


const index = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);

    const [scrollLocation, setScrollLocation] = useState(0);
    const [transform, setTransform] = useState(false);

    const { user, token } = useAuthContext();
    const navigate = useNavigate();

    // const topBlogs = posts.filter(post => post.likes?.length > 0).slice(0, 5);
    const topBlogs = posts.slice(0, 4);
    console.log(topBlogs)


    // FETCH ALL BLOGS
    useEffect(() => {

        async function handleFetchBlogs() {
            setIsLoading(true);
            try {
                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/blogs`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(res)
                if (!res.ok) throw new Error('Something went wrong!');
                const data = await res.json();
                if (data.status !== "success") throw new Error(data.message);
                console.log(data);
                setPosts(data.data.blogs);
                setIsLoading(false);
            } catch (err) {
                console.log(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        handleFetchBlogs();
    }, []);

    useEffect(function() {
        async function fetchBlogCategory() {
            try {
                setIsLoading(true);

                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/blogs/categories`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": 'application/json',
                    }
                });
                if (!res.ok) throw new Error('Something went wrong!');
                const data = await res.json();
                console.log(res, data)
                if (data.status !== 'success') {
                    throw new Error(data.message);
			    }
                setCategories(data.data.categories);
            } catch(err) {
                console.log(err.message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchBlogCategory()
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


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
	}, [scrollLocation])

    return (
        <>
            <Header scrollStyle={transform ? { transform: 'translateY(-100px)' } : { transform: 'translateY(0)' }} />

            {isLoading && (
                <MainSpinner />
            )}
            
            <section className="section blog--section">
                <div className="section__container">

                    {(posts && posts?.length > 0) && (
                        <div className="blog--top">
                            <div className=" polygon__button">
                                <span className="span__white">Top News</span>
                            </div>
                            <div className="marque__div">
                                <Marquee className="marquee">
                                    {posts?.map((post) => (
                                        <span className="span__style marque__span">
                                            {post.title}
                                        </span>
                                    ))}
                                </Marquee>
                            </div>
                        </div>
                    )}

                    <div className="ads__box--big" style={{ width: '100%', height: '12rem' }}>&nbsp;</div>


                    <div className="blog--body">
                        <div className="blog-intro-preview">


                            <figure className="preview--figure preview-1" onClick={() => navigate(`/blogs/${topBlogs[0]?.slug}`)}>
                                <img className="preview--image" src={`${import.meta.env.VITE_SERVER_ASSET_URL}/blogs/${topBlogs[0]?.image}`} alt={topBlogs[0]?.title} />
                                <figcaption className="preview--details">
                                    <div className="preview--details-box">
                                        <p className="preview--heading">{topBlogs[0]?.title}...</p>
                                        <span className="preview--info">
                                            <div className="preview--profile">
                                                <img src={topBlogs[0]?.creator?.image} alt={topBlogs[0]?.creator?.username} />
                                                <p>{topBlogs[0]?.creator?.username}</p>
                                            </div>
                                            <span className="preview--date">
                                                <RiCalendarTodoLine />
                                                today, 2015
                                            </span>
                                        </span>
                                    </div>
                                </figcaption>
                            </figure>

                            <figure className="preview--figure preview-2" onClick={() => navigate(`/blogs/${topBlogs[1]?.slug}`)}>
                                <img className="preview--image" src={`${import.meta.env.VITE_SERVER_ASSET_URL}/blogs/${topBlogs[1]?.image}`} alt={topBlogs[1]?.title} />
                                <figcaption className="preview--details">
                                    <div className="preview--details-box">

                                        <p className="preview--heading">{topBlogs[1]?.title}...</p>
                                        <span className="preview--info">
                                            <div className="preview--profile">
                                                <img src={topBlogs[1]?.creator?.image} alt={topBlogs[1]?.creator?.username} />
                                                <p>{topBlogs[1]?.creator?.username}</p>
                                            </div>
                                            <span className="preview--date">
                                                <RiCalendarTodoLine />
                                                today, 2015
                                            </span>
                                        </span>
                                    </div>
                                </figcaption>
                            </figure>

                            <span className="preview--figure-box">
                                <figure className="preview--figure preview-3" onClick={() => navigate(`/blogs/${topBlogs[2]?.slug}`)}>
                                    <img className="preview--image" src={`${import.meta.env.VITE_SERVER_ASSET_URL}/blogs/${topBlogs[2]?.image}`} alt={topBlogs[2]?.title} />
                                    <figcaption className="preview--details">
                                        <div className="preview--details-box">

                                            <p className="preview--heading">{topBlogs[2]?.title}...</p>
                                            <span className="preview--info">
                                                <div className="preview--profile">
                                                    <img src={topBlogs[2]?.creator?.image} alt={topBlogs[2]?.creator?.username} />
                                                    <p>{topBlogs[2]?.creator?.username}</p>
                                                </div>
                                                <span className="preview--date">.
                                                    <RiCalendarTodoLine />
                                                    today, 2015
                                                </span>
                                            </span>
                                        </div>
                                    </figcaption>
                                </figure>

                                <figure className="preview--figure preview-4" onClick={() => navigate(`/blogs/${topBlogs[3]?.slug}`)}>
                                    <img className="preview--image" src={`${import.meta.env.VITE_SERVER_ASSET_URL}/blogs/${topBlogs[3]?.image}`} alt={topBlogs[3]?.title} />
                                    <figcaption className="preview--details">
                                        <div className="preview--details-box">

                                            <p className="preview--heading">{topBlogs[3]?.title}...</p>
                                            <span className="preview--info">
                                                <div className="preview--profile">
                                                    <img src={topBlogs[3]?.creator?.image} alt={topBlogs[3]?.creator?.username} />
                                                    <p>{topBlogs[3]?.creator?.username}</p>
                                                </div>
                                                <span className="preview--date">
                                                    <RiCalendarTodoLine />
                                                    today, 2015
                                                </span>
                                            </span>
                                        </div>
                                    </figcaption>
                                </figure>
                            </span>
                        </div>
                    </div>


                    <div className="blog--trendy">
                        <div>
                            <TrendyNews />
                            <div className="ads__box--big" style={{ width: '100%', height: '10rem' }}>&nbsp;</div>
                            <TopAuthor />
                        </div>
                        <div>
                            <div className="ads__box--big" style={{ width: '100%', height: '20rem', marginBottom: '1.2rem' }}>&nbsp;</div>
                            <img src={SpinToWin} alt="" />
                            <Categories />
                            <div className="ads__box--big" style={{ width: '100%', height: '18rem' }}>&nbsp;</div>
                        </div>
                    </div>


                    <div className="blog--category-blog">
                        <div className="blog--cat-fig">
                            <SecTitle title={'Lifestyle'} style={customStyle} />

                            <figure className="blog-preview">
                                <img src={Img} alt="" />
                                <figcaption className="blog-preview-details">
                                    <h3>Mystify Winner Is Retired Because of Wealth's Beds Ankle World Wide.</h3>
                                    <span className="preview--info">
                                        <div className="preview-profile">
                                            <img src={Img} alt="" />
                                            <p>Lorem ipsun</p>
                                        </div>
                                        <span className="preview--date">
                                            <RiCalendarTodoLine />
                                            today, 2015
                                        </span>
                                    </span>
                                </figcaption>
                            </figure>


                        </div>

                        <div className="blog--cat-fig">
                            <SecTitle title={'Technology'} style={customStyle} />
                            <figure className="blog-preview">
                                <img src={Img} alt="" />
                                <figcaption className="blog-preview-details">
                                    <h3>Mystify Winner Is Retired Because of Wealth's Beds Ankle World Wide.</h3>
                                    <span className="preview--info">
                                        <div className="preview-profile">
                                            <img src={Img} alt="" />
                                            <p>Lorem ipsun</p>
                                        </div>
                                        <span className="preview--date">
                                            <RiCalendarTodoLine />
                                            today, 2015
                                        </span>
                                    </span>
                                </figcaption>
                            </figure>
                        </div>

                        <div className="blog--cat-fig">
                            <SecTitle title={'Sports'} style={customStyle} />
                            <figure className="blog-preview">
                                <img src={Img} alt="" />
                                <figcaption className="blog-preview-details">
                                    <h3>Mystify Winner Is Retired Because of Wealth's Beds Ankle World Wide.</h3>
                                    <span className="preview--info">
                                        <div className="preview-profile">
                                            <img src={Img} alt="" />
                                            <p>Lorem ipsun</p>
                                        </div>
                                        <span className="preview--date">
                                            <RiCalendarTodoLine />
                                            today, 2015
                                        </span>
                                    </span>
                                </figcaption>
                            </figure>
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
};


export default index;

