
import React from 'react'
import Header from '../../components/Header'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';

import './main.css'

function index() {
    const navigate = useNavigate()
    return (
        <>
            <Header />


            <section className='section setting__section'>
                <div className="section__container">
                    <span onClick={() => navigate(-1)} className='wishlist--back-btn'>Back</span>
                    <h3 className="settings--heading">Your Account Settings</h3>

                    <div className='setting--container'>
                        <form className="settings--form payment-form">
                        {/* <form className="settings--form payment-form" onSubmit={e => handleAccountDetailsUpdate(e)}> */}
                            <h3 className="setting-form--heading">Add a payment account</h3>
                            <div className="form--item">
                                <label className="form--label" htmlFor="paymentBankName">
                                    Payment Bank Name
                                </label>
                                <select className="form--input" id="paymentBankName">
                                {/* <select className="form--input" id="paymentBankName" value={bank} onChange={(e) => setBank(e.target.value)}> */}
                                    <option hidden selected > --Select a bank-- </option>
                                    <option value="Access Bank">Access Bank</option>
                                    <option value="Citi Bank">Citi Bank</option>
                                    <option value="Coronation Merchant Bank">Coronation Merchant Bank</option>
                                    <option value="EcoBank">EcoBank</option>
                                    <option value="Fidelity Bank">Fidelity Bank</option>
                                    <option value="First Bank of Nigeria">First Bank of Nigeria</option>
                                    <option value="First City Monument Bank (FCMB)">First City Monument Bank (FCMB)</option>
                                    <option value="FSDH Merchant Bank">FSDH Merchant Bank</option>
                                    <option value="Globus Bank">Globus Bank</option>
                                    <option value="Greenwich Merchant Bank">Greenwich Merchant Bank</option>
                                    <option value="Guarantee Trust Bank (GTB)">Guarantee Trust Bank (GTB)</option>
                                    <option value="Heritage Bank">Heritage Bank</option>
                                    <option value="Jaiz Bank">Jaiz Bank</option>
                                    <option value="Keystone Bank">Keystone Bank</option>
                                    <option value="Kuda MFB">Kuda MFB</option>
                                    <option value="Lotus Bank">Lotus Bank</option>
                                    <option value="Nova Merchant Bank">Nova Merchant Bank </option>
                                    <option value="Opay">OPAY</option>
                                    <option value="Polaris Bank">Polaris Bank</option>
                                    <option value="Providus Bank">Providus Bank</option>
                                    <option value="Rand Merchant Bank">Rand Merchant Bank </option>
                                    <option value="Stanbic IBTC Bank">Stanbic IBTC Bank</option>
                                    <option value="Standard Chartered Bank">Standard Chartered Bank</option>
                                    <option value="Sterling Bank">Sterling Bank </option>
                                    <option value="Suntrust Bank">Suntrust Bank </option>
                                    <option value="Taj Bank">Taj Bank</option>
                                    <option value="Titan Trust Bank">Titan Trust Bank</option>
                                    <option value="Union Bank Plc">Union Bank Plc</option>
                                    <option value="United Bank for Africa (UBA)">United Bank for Africa (UBA)</option>
                                    <option value="Unity Bank">Unity Bank</option>
                                    <option value="Wema Bank">Wema Bank</option>
                                    <option value="Zenith Bank">Zenith Bank</option>
                                </select>
                            </div>
                            <div className="form--item">
                                <label className="form--label" htmlFor="paymentAcctNum">
                                    Payment Account Number
                                </label>
                                <input
                                    className="form--input"
                                    id="paymentAcctNum"
                                    type="number"
                                    required="required"
                                    placeholder="Bank Number"
                                    minLength={10}
                                    maxLength={10}
                                    // value={acctNumber}
                                    // onChange={e => setAcctNumber(e.target.value)}
                                />
                            </div>
                            <div className="form--item">
                                <label className="form--label" htmlFor="holdersName">
                                    Holder's Name
                                </label>
                                <input
                                    className="form--input"
                                    id="holdersName"
                                    type="text"
                                    name="holdersName"
                                    placeholder="Name As On Bank Document"
                                    required="required"
                                    // value={holderName}
                                    // onChange={e => setHolderName(e.target.value)}
                                />
                            </div>
                            <div className="form--item right">
                                <button type='submit' className="btn form-btn">Add payment account</button>
                            </div>
                        </form>


                        <form className="settings--form password-form">
                        {/* <form className="settings--form password-form" onSubmit={e => handlePasswordUpdate(e)}> */}
                            <h3 className="setting-form--heading">Update Account Password</h3>
                            <div className="form--item">
                                <label className="form--label" htmlFor="password-current">
                                    Current Password
                                </label>
                                <div className="form--input-box">
                                    <input
                                        className="form--input"
                                        id="password-current"
                                        name="password-current"
                                        // type={showCurrPassword ? "text" : "password"}
                                        placeholder="••••••••••••"
                                        required="required"
                                        // value={passwordCurrent}
                                        // onChange={e => setPasswordCurrent(e.target.value)}
                                    />
                                    {/* {showCurrPassword ? (
                                        <FaRegEye
                                            onClick={toggleShowCurrPassword}
                                            className="password__icon"
                                        />
                                    ) : (
                                        <FaRegEyeSlash
                                            onClick={toggleShowCurrPassword}
                                            className="password__icon"
                                        />
                                    )} */}
                                </div>
                            </div>
                            <div className="form--item">
                                <label className="form--label" htmlFor="password">
                                    New Password
                                </label>

                                <div className="form--input-box">
                                    <input
                                        className="form--input"
                                        id="password"
                                        name="password"
                                        // type={showNewPassword ? "text" : "password"}
                                        placeholder="••••••••••••"
                                        required="required"
                                        // value={newPassword}
                                        // onChange={e => setNewPassword(e.target.value)}
                                    />
                                    {/* {showNewPassword ? (
                                        <FaRegEye
                                            onClick={toggleShowNewPassword}
                                            className="password__icon"
                                        />
                                    ) : (
                                        <FaRegEyeSlash
                                            onClick={toggleShowNewPassword}
                                            className="password__icon"
                                        />
                                    )} */}
                                </div>
                            </div>
                            <div className="form--item">
                                <label className="form--label" htmlFor="password-confirm">
                                    Confirm New Password
                                </label>
                                <div className="form--input-box">
                                    <input
                                        className="form--input"
                                        id="password-confirm"
                                        name="password-confirm"
                                        // type={showConfirmNewPassword ? "text" : "password"}
                                        placeholder="••••••••••••"
                                        required="required"
                                        // value={confirmNewPassword}
                                        // onChange={e => setConfirmNewPassword(e.target.value)}
                                    />

                                    {/* {showConfirmNewPassword ? (
                                        <FaRegEye
                                            onClick={toggleShowConfirmNewPassword}
                                            className="password__icon"
                                        />
                                    ) : (
                                        <FaRegEyeSlash
                                            onClick={toggleShowConfirmNewPassword}
                                            className="password__icon"
                                        />
                                    )} */}
                                </div>
                            </div>
                            <div className="form--item right">
                                <button type='submit' className="btn form-btn">Save password</button>
                            </div>
                        </form>


                        <div className="settings--form delete-form">
                            <h4 className='setting-form--heading' style={{ marginBottom: '1rem' }}>Delete My Account </h4>
                            <span className='modal--info'>
                                Every info about this account, transactions, affiliate links, sold product
                                histories, personal details and other sensitive informations would be removed as
                                you click <strong>Delete My Account!</strong>
                            </span>
                            <div className="form--item">
                                {/* <button className="btn delete-account" onClick={() => setShowDeleteModal(true)}>Delete My Account</button> */}
                                {/* onClick={handleDeleteAccount} */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default index
