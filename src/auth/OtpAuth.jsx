import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import otpVerificationImg from "../assets/images/pngs/otp-verification.png";
import MainSpinner from "../components/MainSpinner";
import OtpInput from "react-otp-input";
import Alert from "../components/Alert";
import { AiFillCheckCircle, AiFillExclamationCircle } from "react-icons/ai";

const customStyles = {
    background: "none",
    position: 'fixed',
};

const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem'
}

const inputStyle = {
    width: '5.2rem',
    height: '5.2rem',
    fontSize: '2rem',
    border: '1.6px solid #ccc',
    borderRadius: '.4rem',
    color: '#444',
}

const OtpAuth = ({ isOpen, onClose, email }) => {
    const [otp, setOtp] = useState("");

    const [message, setMessage] = useState('')
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();


    function handleError(mess) {
        setIsError(true);
        setMessage(mess);
        setTimeout(() => {
            setIsError(false);
            setMessage("");
        }, 2000);
    }

    function handleReset() {
        setIsError(false);
        setIsSuccess(false);
        setMessage("");
    }

    // Function to handle OTP input changes
    const handleOtpChange = (newOtp) => {
        setOtp(newOtp);
    };

    
    async function handleResendOTP() {
        try {
            handleReset();
            setIsLoading(true);

            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/request-otp`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (!res.ok) throw new Error('Error Sending OTP');

            const data = await res.json();
            if (data.status !== 'success') {
                throw new Error(data.message);
            }
            setIsSuccess(true);
            setMessage(data.message)
            setTimeout(() => {
                setIsSuccess(false);
                setMessage("");
            }, 1000);
        } catch (err) {
            handleError(err.message)
        } finally {
            setIsLoading(false)
        }
    };

    async function handleVerifyOtp() {
        try {
            handleReset();
            setIsLoading(true);
            const otpCode = parseInt(otp);

            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/verify-otp`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp: otpCode }),
            });
            if (!res.ok) throw new Error('Error Verifying OTP');
            const data = await res.json();
            if (data.status !== 'success') {
                throw new Error(data.message);
            }
            setIsSuccess(true);
            setMessage(data.message)
            setTimeout(() => {
                setIsSuccess(false);
                setMessage("");
                navigate("/login");
            }, 2000);

        } catch (err) {
            handleError(err.message)
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <>
            {isLoading && <MainSpinner />}
            
            {isOpen && (
                <div className="otp__container opt">
                    <div className="auth__modal modal">
                        <img
                            className="modal__image"
                            src={otpVerificationImg}
                            alt="design image"
                        />
                        <div className="modal__content-box">
                            <h4 className="content__header">OTP Verification</h4>
                            <p className="content__description">Enter your OTP code, sent to <br />{" "}<strong>your email. Please verify!</strong></p>
                            <div className="otp__input-box">
                                <OtpInput
                                    value={otp}
                                    onChange={handleOtpChange}
                                    numInputs={4}
                                    inputStyle={inputStyle}
                                    containerStyle={containerStyle}
                                    isInputNum={true}
                                    renderInput={(props) => <input style={inputStyle} {...props} />}
                                    inputType="number"
                                />
                            </div>
                            <div className="modal__actions">
                                <button className="modal__button continue" onClick={handleVerifyOtp}>Continue</button>
                                <button className="resend" onClick={handleResendOTP}>Resend code</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

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
};

export default OtpAuth;
