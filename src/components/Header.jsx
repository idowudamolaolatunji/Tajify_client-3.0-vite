import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import { LuHome } from "react-icons/lu";
import { PiNotePencilFill } from "react-icons/pi";
import { MdConnectedTv } from "react-icons/md";
import { BiCart, BiNetworkChart } from "react-icons/bi";
import { GiHamburgerMenu, GiShoppingBag } from "react-icons/gi";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFillGridFill, BsFillBellFill, BsChevronDown, BsChevronUp } from "react-icons/bs";
import LogoImg from "../assets/images/pngs/logo-complete.png";
import { useAuthContext } from "../context/AuthContext";
import { CiSearch } from "react-icons/ci";

import "../assets/css/header.css";

import DropdownMenu from "./DropdownMenu";
import HeaderSearchModal from './HeaderSearchModal';
import Notification from "./Notification";
import { SlNote } from "react-icons/sl";
import { getInitials } from "../utils/helper";
import { useCartContext } from "../context/CartContext";

// const DropdownMenu = () => <p>Hello</p>
// const Notification = () => <p>Hello</p>
// const HeaderSearchModal = () => <p>Hello</p>


function Header({ valid, setOpenConfirm, isSaving, saved, scrollStyle, type }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isShowMobileMenu, setIsShowMobileMenu] = useState(false)
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const location = useLocation();

    const profileBoxRef = useRef(null);
    const { user, token } = useAuthContext();

    const { cartItems } = useCartContext();


    function toggleNotification() {
        setIsNotificationOpen(!isNotificationOpen);
    };
    function toggleDropdown() {
        setIsDropdownOpen(!isDropdownOpen);
    };
    function toggleMobileMenu() {
        setIsShowMobileMenu(!isShowMobileMenu);
    };

    useEffect(function () {

        const fetchSearch = setTimeout(async () => {
            try {
                if (searchQuery.trim() === '' || !setSearchQuery) {
                    setShowSearchModal(false)
                    setResults({});
                    return;
                }

                setMessage('');
                setIsLoading(true);
                setShowSearchModal(true);

                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/search?query=${searchQuery}`
                    , {
                        method: 'GET',
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                if (!res.ok) throw new Error('Something went wrong!');
                setIsLoading(true)
                const data = await res.json();
                console.log(res, data);
                setShowSearchModal(true);
                setResults(data.data.results)

            } catch (err) {
                if (err.name !== "AbortError") {
                    setMessage(err.message)
                    setShowSearchModal(false)
                }
            } finally {
                setIsLoading(false);
            }
        }, 350)

        return function () {
            clearTimeout(fetchSearch)
        };

    }, [searchQuery]);


    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                profileBoxRef.current &&
                !profileBoxRef.current.contains(event.target)
            ) {
                setIsDropdownOpen(false);
            }
        };
        document.body.addEventListener("click", handleOutsideClick);
        return () => {
            document.body.removeEventListener("click", handleOutsideClick);
        };
    }, []);


    return (
        <>
            <header className="main-header main" style={scrollStyle}>
                <span className="logo__box">
                    <Link to="/">
                        <img src={LogoImg} alt={LogoImg} />
                    </Link>
                </span>

            
                {!location.pathname.includes('/market') ? (
                    <>
                        <span className="header__input">
                            <input type="search" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                            {!searchQuery && <AiOutlineSearch className="header__input-icon" />}
                        </span>
            

                        <nav className="main-navbar">
                            <ul className="navbar__list">
                                <NavLink to="/">
                                    <li className={`navbar__item ${location.pathname === '/' ? 'nav-active' : ''}`}>
                                        <LuHome className="navbar--icon" />
                                        Home
                                    </li>
                                </NavLink>

                                <NavLink to="/blogs">
                                    <li className={`navbar__item ${(location.pathname.includes('blogs') || location.pathname.includes('post')) ? 'nav-active' : ''}`}>
                                        <PiNotePencilFill className="navbar--icon" />
                                        Blogs
                                    </li>
                                </NavLink>

                                <NavLink to="/channel">
                                    <li className={`navbar__item ${location.pathname === '/channel' ? 'nav-active' : ''}`}>
                                        <MdConnectedTv className="navbar--icon" />
                                        Channels
                                    </li>
                                </NavLink>

                                <NavLink to="/market">
                                    <li className={`navbar__item ${location.pathname === '/market' ? 'nav-active' : ''}`}>
                                        <GiShoppingBag className="navbar--icon" />
                                        Market
                                    </li>
                                </NavLink>

                                <NavLink to="/coming-soon">
                                    <li className={`navbar__item ${location.pathname === '/digiwork' ? 'nav-active' : ''}`}>
                                        <BiNetworkChart className="navbar--icon" />
                                        DigiWorks
                                    </li>
                                </NavLink>
                                
                                <li className="navbar__item">
                                    <BsFillGridFill className="navbar--icon" />
                                    More
                                </li>
                            </ul>
                            
                            <nav className="navbar--others">
                                {!user ? (
                                    <>
                                        <Link to="/signup" className=" nav__button creator ">
                                            Become a Creator
                                        </Link>

                                        <Link
                                            to="/signup"
                                            className="nav__button signup"
                                            style={{ color: "#ff0066", fontWeight: "500" }}
                                        >
                                            Get Started
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        {(location.pathname.includes('/blogs')) && (
                                            <Link to="/write-post">
                                                <span className="navbar--write">
                                                    <SlNote className="navbar--others-icon" />
                                                    <p>write</p>
                                                </span>
                                            </Link>
                                        )}
                                        {(location.pathname.includes('-post')) && (
                                            <>
                                                {isSaving ? <p className="saving--text">Saving...</p> : saved && <p className="saving--text">Saved!</p>}
                                                <span className={`publish--button ${valid ? 'allow--button' : ''}`} onClick={valid ? () => setOpenConfirm(true) : null}>Publish</span>
                                            </>
                                        )}
                                        <BsFillBellFill className="navbar--others-icon" style={isNotificationOpen ? { color: '#ff0066', fontSize: '2rem' } : { fontSize: "2rem" }} onClick={toggleNotification} />
                                        {isNotificationOpen && (
                                            <Notification toggleNotification={toggleNotification} />
                                        )}

                                        <span className="navbar--profile" onClick={() => setIsDropdownOpen(!isDropdownOpen)} onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
                                            {(user?.image) ? (
                                                <img
                                                    className="navbar--profile-img"
                                                    src={user?.image}
                                                    alt={user?.username}
                                                />
                                            ) : (
                                                <span className="navbar__initials img-initials">
                                                    {getInitials(user?.fullname)}
                                                </span>
                                            )}

                                            <p className="profile-user">{user?.fullName || user?.username}</p>

                                            {isDropdownOpen ? <BsChevronUp style={{ color: "#ff0066", fontSize: '1.4rem' }} /> : <BsChevronDown style={{ fontSize: '1.4rem' }} />}
                                            {isDropdownOpen && (
                                                <DropdownMenu toggleDropdown={toggleDropdown} />
                                            )}
                                        </span>
                                    </>
                                )}
                            </nav>
                        </nav>

                    </>
                ) : (
                    <>
                        <span className="header--market-input-box">
                            <input className="header--market-input" type="text" placeholder="Search categories, brands and products" />
                            <button className="header--market-btn">Search</button>
                        </span>

                        <nav className="navbar--others market">

                            <NavLink to="/">
                                <li className={`navbar__item ${location.pathname === '/' ? 'nav-active' : ''}`}>
                                    <LuHome className="navbar--icon" />
                                    Home
                                </li>
                            </NavLink>

                            {!user ? (
                                <>
                                    <Link
                                        to="/signup"
                                        className="nav__button signup"
                                        style={{ color: "#ff0066", fontWeight: "500" }}
                                    >
                                        Get Started
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <NavLink to="/market/cart">
                                        <li data-length={cartItems?.length} className={`navbar__item ${cartItems.length > 0 ? 'cart--nav-item' : ''} ${location.pathname === '/market/cart' ? 'nav-active' : ''}`}>
                                            <BiCart className="navbar--icon" style={{ fontSize: '2rem' }} />
                                            Cart
                                        </li>
                                    </NavLink>
                                    

                                    <span className="navbar--profile" onClick={() => setIsDropdownOpen(!isDropdownOpen)} onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
                                        {(user?.image) ? (
                                            <img
                                                className="navbar--profile-img"
                                                src={user?.image}
                                                alt={user?.username}
                                            />
                                        ) : (
                                            <span className="navbar__initials img-initials">
                                                {getInitials(user?.fullname)}
                                            </span>
                                        )}

                                        <p className="profile-user">{user?.fullName || user?.username}</p>

                                        {isDropdownOpen ? <BsChevronUp style={{ color: "#ff0066", fontSize: '1.4rem' }} /> : <BsChevronDown style={{ fontSize: '1.4rem' }} />}
                                        {isDropdownOpen && (
                                            <DropdownMenu toggleDropdown={toggleDropdown} />
                                        )}
                                    </span>
                                </>
                            )}
                        </nav>
                    
                    </>
                )}

            </header>


            {/* MOBILE HEADER */}

            <header className="main-header main-mobile">
                <Link to="/">
                    <span className="logo__box">
                        <img src={LogoImg} alt={LogoImg} />
                    </span>
                </Link>


                <nav className="navbar--others">
                    {!user ? (
                        <>
                            <Link
                                to="/signup"
                                className="nav__button signup"
                                style={{ color: "#ff0066", fontWeight: "500" }}
                            >
                                Get Started
                            </Link>
                        </>
                    ) : (
                        <>
                            <BsFillBellFill className="navbar--others-icon" />
                            <span className="navbar--profile">
                                {(user?.image) ? (
                                    <img
                                        className="navbar--profile-img"
                                        src={user?.image}
                                        alt={user?.username}
                                    />
                                ) : (
                                    <span className="navbar__initials img-initials">
                                        {getInitials(user?.fullname)}
                                    </span>
                                )}

                                <Link to="/profile">
                                    <p className="profile-user">{user?.fullName || user?.username}</p>
                                </Link>

                                {isDropdownOpen ? <BsChevronUp style={{ color: "#ff0066" }} onClick={toggleDropdown} /> : <BsChevronDown onClick={toggleDropdown} />}
                                {isDropdownOpen && (
                                    <DropdownMenu toggleDropdown={toggleDropdown} />
                                )}
                            </span>
                        </>
                    )}

                    <GiHamburgerMenu className="navbar--others-icon" style={isShowMobileMenu ? { color: "#ff0066" } : ''} onClick={toggleMobileMenu} />
                    {isShowMobileMenu && <ul className="mobile-navbar__list">

                        <NavLink to="/">
                            <li className={`navbar__item ${location.pathname === '/' ? 'nav-active' : ''}`}>
                                <LuHome className="navbar--icon" />
                                Home
                            </li>
                        </NavLink>

                        <NavLink to="/writer">
                            <li className={`navbar__item ${location.pathname === '/writer' ? 'nav-active' : ''}`}>
                                <PiNotePencilFill className="navbar--icon" />
                                Blogs
                            </li>
                        </NavLink>

                        <NavLink to="/channel">
                            <li className={`navbar__item ${location.pathname === '/channel' ? 'nav-active' : ''}`}>
                                <MdConnectedTv className="navbar--icon" />
                                Channels
                            </li>
                        </NavLink>

                        <NavLink to="/market">
                            <li className={`navbar__item ${location.pathname === '/market' ? 'nav-active' : ''}`}>
                                <GiShoppingBag className="navbar--icon" />
                                Market
                            </li>
                        </NavLink>

                        <NavLink to="/coming-soon">
                            <li className={`navbar__item ${location.pathname === '/digiwork' ? 'nav-active' : ''}`}>
                                <BiNetworkChart className="navbar--icon" />
                                DigiWorks
                            </li>
                        </NavLink>

                        <li className="navbar__item">
                            <BsFillGridFill className="navbar--icon" />
                            More
                        </li>

                        {!user &&
                            <Link to="/signup">
                                <li className="navbar__item">
                                    Become a Creator
                                </li>
                            </Link>
                        }
                    </ul>
                    }
                </nav>
            </header>


            {showSearchModal && <HeaderSearchModal showSearchModal={showSearchModal} setShowSearchModal={setShowSearchModal} isLoading={isLoading} message={message} results={results} />}

        </>
    );
}

export default Header;
