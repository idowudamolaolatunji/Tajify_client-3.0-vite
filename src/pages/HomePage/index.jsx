import React, { useEffect, useState } from "react";
import Header from '../../components/Header';
import { useAuthContext } from "../../context/AuthContext";
import Hero from "./components/Hero";
import MostPopularCoursesCategory from "./components/MostPopularCoursesCategory";
import TreadingArticles from "../../components/TreadingArticles";
import ExploreSkills from "./components/ExploreSkills";
import ExploreCategories from "../../components/ExploreCategories";
import TopNewsAndFeaturedArticles from "./components/TopNewsAndFeaturedArticles";
import TopCreators from "./components/TopCreators";
import ExploreMore from "./components/ExploreMore";

// import Footer from "../../components/Footer";
// import Products from "../../components/Products";
import "./main.css";


function HomePage() {
    const { user } = useAuthContext();

    useEffect(function () {
        document.title = 'Tajify | Welcome To Tajify';

        if (user) {
            document.title = `Tajify | Welcome Back ${user?.username}`
        }
    }, [user]);

    return (
        <>

            <Header />
            <Hero />
            <MostPopularCoursesCategory />
            <TreadingArticles />
            <ExploreSkills />
            <ExploreCategories />
            <TopNewsAndFeaturedArticles />
            <TopCreators />
            <ExploreMore />
            {/* 
        <Products />
        <Footer /> */}
        </>
    );
};

export default HomePage;
