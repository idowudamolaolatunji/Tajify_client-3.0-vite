import React from "react";
import ExploreButton from "./ExploreButton";
import { Link, NavLink } from "react-router-dom";
import jobsImg from "../../../assets/images/hero-img/jobs.png";
import gigsImg from "../../../assets/images/hero-img/gigs.png";
import marketImg from "../../../assets/images/hero-img/market.png";
import coursesImg from "../../../assets/images/hero-img/courses.png";


function ExploreMore() {
    return (
        <section className="section explore-more__section">
            <div className="section__container">
                <h3 className="heading__tetariary">Explore more services</h3>
                <div className="explore-more">
                    <div className="explore-more--text">
                        <p className="explore-more--description">
                            Explore more on our platform as we bring you different kind of
                            services.{" "}
                        </p>
                        <ExploreButton><Link to='/signup'>Try tajify</Link></ExploreButton>
                    </div>
                    <div className="explore-more--figures">
                        <NavLink to="/coming-soon">
                            <div className="explore-more--figure">
                                <img src={jobsImg} alt="" />
                                <p>Jobs</p>
                            </div>
                        </NavLink>

                        <NavLink to="/coming-soon">
                            <div className="explore-more--figure">
                                <img src={gigsImg} alt="" />
                                <p>Gigs</p>
                            </div>
                        </NavLink>

                        <NavLink to="/coming-soon">
                            <div className="explore-more--figure">
                                <img src={marketImg} alt="" />
                                <p>Market</p>
                            </div>
                        </NavLink>

                        <NavLink to="/coming-soon">
                            <div className="explore-more--figure">
                                <img src={coursesImg} alt="" />
                                <p>Courses</p>
                            </div>
                        </NavLink>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ExploreMore;
