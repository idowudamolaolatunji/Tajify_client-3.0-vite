import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { VscLibrary } from "react-icons/vsc";
import { BsBarChart } from "react-icons/bs";
import { CiWallet } from "react-icons/ci";
import { Link } from "react-router-dom";
import { MdOutlineLogout, MdUpgrade } from "react-icons/md";
import { useAuthContext } from "../context/AuthContext";
import { SlSettings } from "react-icons/sl";

function DropdownMenu({ }) {
    const { logout } = useAuthContext();

    function handleLogout() {
        logout();

        // logging out
        setTimeout(() => {
            window.location.href = '/'
        }, 1000)
    }

    return (
        <div className="dropdown-menu">
            <ul className="dropdown-list dropdown-list--top">
                <Link to="/my-profile">
                    <li className="dropdown-item">
                        <AiOutlineUser />
                        <p>Profile</p>
                    </li>
                </Link>
                <Link to="/wallet">
                    <li className="dropdown-item">
                        <CiWallet />
                        <p>Wallet</p>
                    </li>
                </Link>
                <Link to="">
                    <li className="dropdown-item">
                        <SlSettings />
                        <p>Settings</p>
                    </li>
                </Link>
                <Link to="">
                    <li className="dropdown-item">
                        <MdUpgrade />
                        <p>Settings</p>
                    </li>
                </Link>
                <li className="dropdown-item" onClick={handleLogout}>
                    <MdOutlineLogout />
                    <p>Logout</p>
                </li>
            </ul>

            <ul className="dropdown-list dropdown-list--bottom">
                {/* <Link to="/settings"> */}
                
                <li className="dropdown-item">
                    <p>Recommendation</p>
                </li>
                <li className="dropdown-item">
                    <p>Publication</p>
                </li>
                <li className="dropdown-item">
                    <p>Help Center</p>
                </li>
                <li className="dropdown-item">
                    <p>Upgrade</p>
                </li>
            </ul>
        </div>
    );
}

export default DropdownMenu;
