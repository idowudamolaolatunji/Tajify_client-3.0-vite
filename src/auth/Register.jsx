
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { HiOutlineKey } from "react-icons/hi";
import { BiRename, BiSolidUser } from "react-icons/bi";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { AiFillCheckCircle, AiFillExclamationCircle, AiOutlineMail } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import SignupImg from "../assets/images/pngs/signup-img.png";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

import OtpAuth from './OtpAuth';
import Alert from "../components/Alert";
import MainSpinner from "../components/MainSpinner";
import "./main.css";
import { GoogleLogin } from '@react-oauth/google';
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";


function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [fullname, setFullname] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [check, setCheck] = useState(true)
    const [isLoading, setIsLoading] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showOtpModal, setShowOtpModal] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    const [message, setMessage] = useState('')
    const [isError, setIsError] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const { user } = useAuthContext();

    const closeModal = () => {
        setIsModalOpen(false);
    };


    function handleError(mess) {
        setIsError(true);
        setMessage(mess);
        setTimeout(() => {
            setIsError(false);
            setMessage("");
        }, 2000);
    }

    function handleReset() {
        setCheck(true)
        setIsError(false);
        setIsSuccess(false);
        setMessage("");
    }

    function togglePasswordVisibility() {
        setShowPassword(!showPassword);
    };
    function togglePasswordConfirmVisibility() {
        setShowPasswordConfirm(!showPasswordConfirm);
    };

    async function handleSubmit(e) {
        try {
            e.preventDefault();
            setIsLoading(true);
            handleReset();

            if (email === '' || password === '' || fullname === "" || username === "" || passwordConfirm === "" || !check) throw new Error('All fields are required!');

            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/signup`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, email, fullname, password, passwordConfirm }),
            }
            );
            if (!res.ok) throw new Error("Something went wrong!")
            const data = await res.json();
            if (data.status !== 'success') throw new Error(data.message);

            setIsSuccess(true);
            setMessage(data.message || 'Signup Successful. Verify OTP Code')
            setTimeout(() => {
                setIsSuccess(false);
                setMessage("");
                setShowOtpModal(true);
            }, 1000);
        } catch (err) {
            handleError(err.message)
        } finally {
            setIsLoading(false)
        }
    };

    useEffect(function () {
        document.title = 'Tajify | Create a Tajify Account'
    }, [])

    return (
        <>
            {isLoading && <MainSpinner />}
            <section className="signup__section">
                <div className="signup__container signup">
                    <div className="signup__images--box">
                        <img src={SignupImg} alt="signup image" />
                    </div>
                    <div className="auth">
                        <h3 className="auth__heading">Register</h3>
                        <div className="auth__head">
                            <GoogleLogin
                                onSuccess={credentialResponse => {
                                    console.log(credentialResponse);
                                }}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                            />
                        </div>

                        <span className="auth__mid">
                            <p> or register with email </p>
                        </span>

                        <form className="login__form" autoComplete="off" onSubmit={handleSubmit}>
                            <div className="form__item">
                                <BiSolidUser className="input__icon" />
                                <input
                                    type="text"
                                    className="form__input"
                                    placeholder="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form__item">
                                <AiOutlineMail className="input__icon" />
                                <input
                                    type="email"
                                    className="form__input"
                                    placeholder="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form__item">
                                <MdOutlineDriveFileRenameOutline className="input__icon" />
                                <input
                                    type="text"
                                    className="form__input"
                                    placeholder="full Name"
                                    value={fullname}
                                    onChange={(e) => setFullname(e.target.value)}
                                />
                            </div>
                            <div className="form__item">
                                <HiOutlineKey className="input__icon" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form__input"
                                    placeholder="Password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                {showPassword ? (
                                    <FaRegEye
                                        onClick={togglePasswordVisibility}
                                        className="password__icon"
                                    />
                                ) : (
                                    <FaRegEyeSlash
                                        onClick={togglePasswordVisibility}
                                        className="password__icon"
                                    />
                                )}
                            </div>
                            <div className="form__item">
                                <HiOutlineKey className="input__icon" />
                                <input
                                    type={showPasswordConfirm ? "text" : "password"}
                                    className="form__input"
                                    placeholder="Confirm Password"
                                    onChange={(e) => setPasswordConfirm(e.target.value)}
                                    value={passwordConfirm}
                                    required
                                />
                                {setShowPasswordConfirm ? (
                                    <FaRegEye
                                        onClick={togglePasswordConfirmVisibility}
                                        className="password__icon"
                                    />
                                ) : (
                                    <FaRegEyeSlash
                                        onClick={togglePasswordConfirmVisibility}
                                        className="password__icon"
                                    />
                                )}
                            </div>
                            <div className="form__flex">
                                <input type="checkbox" className="form__check-box" checked={true} id="check" onChange={(e) => setCheck((prev) => !prev)} />
                                <label htmlFor="checkbox" className="form__label">
                                    I agree to the{" "}
                                    <a href="#" className="form__link">
                                        Terms </a> &
                                    <a href="#" className="form__link">
                                        Privacy policy</a>.
                                </label>
                            </div>
                            <span className="form__extra">
                                Already have an account? <Link to="/login">Login</Link>
                            </span>
                            
                            <div className="form__item">
                                <button className="form__submit button">
                                    Create Account
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            {showOtpModal && <OtpAuth
                isOpen={showOtpModal}
                email={email}
                onClose={() => setShowOtpModal(false)} />
            }

            <Alert alertType={`${isSuccess ? "success" : isError ? "error" : ""}`}>
                {isSuccess ? (
                    <AiFillCheckCircle className="alert--icon" />
                ) : isError ? (
                    <AiFillExclamationCircle className="alert--icon" />
                ) : (
                    ""
                )}
                <p>{message}</p>
            </Alert>

        </>
    );
};

export default Register;






