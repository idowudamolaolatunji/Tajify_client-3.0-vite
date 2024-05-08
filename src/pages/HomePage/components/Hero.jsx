import React, { useEffect, useState } from "react";
import Typed from "react-typed";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

// import Shield from "../../../assets/svgs/shield.svg";

import Shield from '../../../assets/svgs/sheild.svg';
import Alert from "../../../components/Alert";
import MainSpinner from "../../../components/MainSpinner";
import Stat from "./Stat";

import { AiFillCheckCircle, AiFillExclamationCircle, AiOutlineSearch } from "react-icons/ai";

import HeroImg from "../../../assets/images/hero-img/photo1.png";
import HeroImg4 from "../../../assets/images/hero-img/photo4.png";
import HeroImg5 from "../../../assets/images/hero-img/photo5.png";
import HeroImg3 from "../../../assets/images/hero-img/photo3.png";

import TextTransition, { presets } from 'react-text-transition';
const TEXTS = [" Success", " Fulfillment", " Accomplishment", "Innovation"]


function Hero() {
    const [email, setEmail] = useState('');
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [index, setIndex] = useState(0);

    // const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);
    const timeout = 2000;


    // HANDLE FETCH STATE RESET
    function handleReset() {
        setIsError(false);
        setMessage('')
        setIsSuccess(false);
        setMessage();
    }

    // HANDLE ON FETCH FAILURE
    function handleFailure(mess) {
        setIsError(true);
        setMessage(mess)
        setTimeout(() => {
            setIsError(false);
            setMessage('')
        }, timeout);
    }


    async function handleSubmit(e) {
        try {
            e.preventDefault();
            handleReset();
            setIsLoading(true);

            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/search/subscribe-newsletter`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email })
            });
            if (!res.ok) throw new Error('Something Went Wrong!');
            const data = await res.json();
            if (data.status !== 'success') throw new Error(data.message);
            setIsSuccess(true);
            setMessage(data.message)
            setTimeout(async function () {
                setIsSuccess(false);
                setMessage('');
            }, 1500);

        } catch (err) {
            handleFailure(err.message);
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        const intervalId = setInterval(function () {
            setIndex((index) => index + 1)
        }, 3000);
        return () => clearTimeout(intervalId);
    }, []);

    return (
        <>
            {isLoading && <MainSpinner />}
            <div className="hero__section">
                <div className="section__container">
                    <div className="hero">
                        <div className="hero__text--box">
                            <h1 className="heading__primary">
                                Find the perfect creative service for your path to 
                                <br />
                                {/* <Typed
                                    strings={[" Success", " Fulfillment", " Accomplishment", "Innovation"]}
                                    typeSpeed={70}
                                    backSpeed={80}
                                    loop
                                    className="hero--extra"
                                /> */}
                                {/* <TextTransition springConfig={presets.wobbly}>{TEXTS[index % TEXTS.length]}</TextTransition> */}
                                <TextTransition springConfig={presets.slow}>{TEXTS[index % TEXTS.length]}</TextTransition>

                            </h1>
                            <p className="heading__description">
                                Discover the Ideal Platform Designed to Assist You in Finding Creative Services Tailored to Your Path to Success. &nbsp;
                                <span className="hero--extra"> Unleash Your Content, Skills, Knowledge, Passion, Followership, and Writing Abilities.</span>
                            </p>
                            <form className="hero__form" onSubmit={handleSubmit}>
                                <input
                                    className="hero__form--input"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Signup for newsletter"
                                />
                                <button className="hero__form--btn" type="submit">
                                    Subscribe
                                </button>
                            </form>

                            <div className="hero__stats">
                                <img src={Shield} alt="" />
                                <Stat figure="1M+" text="services" />
                                <Stat figure="1200+" text="Active users" />
                            </div>

                        </div>

                        <div className="hero__images--box">
                            <img src={HeroImg} className="hero__image" alt="" />
                        </div>

                        {/* <div className="embla hero__images--box" ref={emblaRef}>
                            <div className="embla__container">
                                <div className="embla__slide ">
                                    <img
                                        src={HeroImg}
                                        alt="hero photo tajify"
                                        className="hero__image"
                                    />
                                </div>
                                <div className="embla__slide ">
                                    <img
                                        src={HeroImg4}
                                        alt="hero photo tajify"
                                        className="hero__image"
                                    />
                                </div>
                                <div className="embla__slide ">
                                    <img
                                        src={HeroImg5}
                                        alt="hero photo tajify"
                                        className="hero__image"
                                    />
                                </div>
                                <div className="embla__slide ">
                                    <img
                                        src={HeroImg3}
                                        alt="hero photo tajify"
                                        className="hero__image"
                                    />
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>


            {isSuccess || isError && (
                <Alert alertType={`${isSuccess ? "success" : isError ? "error" : ""}`}>
                    {isSuccess ? (
                        <AiFillCheckCircle className="alert--icon" />
                    ) : isError && (
                        <AiFillExclamationCircle className="alert--icon" />
                    )}
                    <p>{message}</p>
                </Alert>
            )}
        </>
    );
}


export default Hero;
