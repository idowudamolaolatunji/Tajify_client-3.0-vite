import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import Card from "./Card";
import { Swiper, SwiperSlide, } from "swiper/react";
import "swiper/css";
import { FreeMode } from "swiper/modules";


// SwiperCore.use([ Autoplay]);
// import "swiper/css/navigation ";
import "swiper/css/pagination";
import "swiper/css/scrollbar";



function ExploreCategories() {
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    const breakpoints = {
        320: {
            slidesPerView: 2,
        },
        425: {
            slidesPerView: 3,
        },
        550: {
            slidesPerView: 4,
        },
        768: {
            slidesPerView: 5,
        },
        1024: {
            slidesPerView: 7,
        },
    };


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


    return (
        <section className="section__container section">
            <div className="popular__courses--2">
                <h2 className="heading__tetariary">Popular Categories</h2>
                <Swiper
                    modules={[FreeMode]}
                    freeMode={true}
                    breakpoints={breakpoints}
                    grabCursor={true}
                    spaceBetween={10}
                    className="mySwiper"
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                >

                    {categories.map((data) => (
                        <div
                            className="course__cards "
                            style={{
                                gridTemplateColumns: `repeat(${categories.length}, 4fr)`,

                            }}
                        >
                            <SwiperSlide key={data.title}>

                                <Link to={`/category/${data?.categoryName}`}>
                                    <figure className="card__figure">
                                        <img className="" src={`${import.meta.env.VITE_SERVER_ASSET_URL}/blogs/${data?.categoryImage}`} />
                                        <span className="figure--details">
                                            <p className="card__figure--title">{data?.categoryName}</p>
                                        </span>
                                    </figure>
                                </Link>

                            </SwiperSlide>
                        </div>
                    ))}
                </Swiper>
            </div>
        </section>
    )
}

export default ExploreCategories
