import React, { useEffect, useState } from "react";
import PopularCoursesCards from "../../../components/PopularCoursesCards";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import CardSkelenton from "../../../components/uis/CardSkelenton";


const breakpoints = {
    320: {
        slidesPerView: 2,
    },
    550: {
        slidesPerView: 3,
    },
    768: {
        slidesPerView: 4,
    },
    1024: {
        slidesPerView: 5,
    },
};

function MostPopularCoursesCategory() {
    const [isLoading, setIsLoading] = useState(false)
    const [courseCategories, setCourseCategories] = useState([]);


    useEffect(function () {
        async function fetchPopularCourseCategory() {
            try {
                setIsLoading(true);

                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/courses/categories`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": 'application/json'
                    }
                });
                if (!res.ok) throw new Error('Something went wrong!');
                const data = await res.json();
                console.log(data);

                setCourseCategories(data.data.categories);

            } catch (err) {
                console.log(err.message)
            } finally {
                setIsLoading(false);
            }
        }
        fetchPopularCourseCategory();
    }, [])


    return (
        <section className="section__container section">
            <div className="popular__courses--2">
                <h2 className="heading__tetariary">Popular Courses</h2>
                <Swiper modules={[FreeMode]}
                    freeMode={true}
                    breakpoints={breakpoints}
                    grabCursor={true}
                    spaceBetween={10}
                    className="mySwiper">

                    {isLoading && (
                        <CardSkelenton />
                    )}

                    {courseCategories?.map((courseCat) => (
                        <div className="course__cards" style={{ gridTemplateColumns: `repeat(${courseCategories?.length}, 1fr)`, gap: '8rem' }}>
                            <SwiperSlide key={courseCat?.title}>
                                <PopularCoursesCards
                                    name={courseCat?.categoryName}
                                    imagePath={`${import.meta.env.VITE_SERVER_ASSET_URL}/courses/${courseCat?.categoryImage}`}
                                />
                            </SwiperSlide>
                        </div>
                    ))}

                </Swiper>
            </div>
        </section>
    );
}

export default MostPopularCoursesCategory;


