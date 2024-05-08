import React, {useEffect, useState} from "react";

import { useAuthContext } from '../../context/AuthContext';
import DashboardTable from "./components/DashboardTable";
import WalletActions from "./components/WalletActions";
import WalletInsightCard from "./components/WalletInsightCard";
import { numberConverter } from '../../utils/helper';

import { FaSackDollar, FaUserPen } from "react-icons/fa6";
import { GiCrownCoin, GiMoneyStack, GiTakeMyMoney } from "react-icons/gi";
import "./main.css";
import Header from "../../components/Header";

function index() {
	const { token } = useAuthContext();
    const [activeModalTab, setActiveModalTab] = useState('deposit');
	const [isDataUpdated, setIsDataUpdated] = useState(false);
	const [isP2P, setIsP2P] = useState(false);
	const [userSlots, setUserSlots] = useState([]);
	const [userWallet, setUserWallet] = useState({})

	function onUpdate(data) {
		setIsDataUpdated(data);
	}

	function getSlots(slots) {
		setUserSlots(slots);
	}

	useEffect(() => {
		async function getUserWallet() {
			try {
				const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/transactions/wallet-balance`, {
					headers: {
						"Content-Type": "application/json",
                		Authorization: `Bearer ${token}`
					}
				});
				if(!res.ok) throw new Error('Something went wrong')
				const data = await res.json();
			console.log(data.data.wallet)
				setUserWallet(data?.data?.wallet);
				console.log()
			} catch(err) {
				console.log(err);
			}
		} 
		getUserWallet()
	}, [isDataUpdated]);

	useEffect(function() {
		document.title = 'Tajify | Your Tajify Wallet';
	}, []);

	return (
		<>
			<Header />
			<div className="dashboard__wallet">

				<div className="wallet__top">
					{/* <div className="wallet--profile">
						<span className="wallet--profile-image">
							<img src={user?.image} alt={user?.image} />
						</span>
						<p className="wallet--user-name">{user?.fullName || user?.username}</p>
					</div> */}

					<div className="wallet--cards wallet">
                        <div className='admin__insight'>
							
                            <WalletInsightCard
							insightIcon={<GiMoneyStack />} insightTitle={'Naira Balance'}
							insightFigure={`₦${numberConverter(userWallet?.nairaWalletBalance)}`}
							pendingInsightTitle={'Pending Naira'}
							pendingInsightFigure={`₦${numberConverter(userWallet?.pendingNairaBalance)}`} />

                            <WalletInsightCard
							insightIcon={<GiCrownCoin />} insightTitle={'TAJI Balance'}
							insightFigure={`TAJI ${numberConverter(userWallet?.tajiWalletBalance)}`}
							pendingInsightTitle={'Pending Taji'}
							pendingInsightFigure={`TAJI ${numberConverter(userWallet?.pendingTajiBalance)}`}/>

                            <WalletInsightCard
							insightIcon={<FaSackDollar  />}
							insightTitle={'USDT Balance'}
							insightFigure={`$${numberConverter(userWallet?.usdtWalletBalance)}`}
							pendingInsightTitle={'Pending usdt'}
							pendingInsightFigure={`$${numberConverter(userWallet?.pendingUsdtBalance)}`} />
                        </div>
                            
                        <WalletActions onUpdate={onUpdate} userSlots={userSlots} setIsP2P={setIsP2P} />
					</div>
				</div>

				<div className="wallet__bottom">
					<span>
						<h3 className="wallet--heading">Transactions History</h3>

						<div className="wallet--tabs">
							<span className={`wallet--tab ${activeModalTab === "deposit" && "tab--active"}`} onClick={() => { setActiveModalTab("deposit")}}>Deposit</span>
							<span className={`wallet--tab ${activeModalTab === "withdrawal" && "tab--active"}`} onClick={() => { setActiveModalTab("withdrawal")}}>Withdrawal</span>
							<span className={`wallet--tab ${activeModalTab === "staking" && "tab--active"}`} onClick={() => { setActiveModalTab("staking")}}>Staking</span>
							<span className={`wallet--tab ${activeModalTab === "purchase" && "tab--active"}`} onClick={() => { setActiveModalTab("purchase")}}>Purchases</span>
						</div>

						<select className="wallet--tabs-mobile" value={activeModalTab} onChange={(e) => { setActiveModalTab(e.target.value) }}>
							<option value="deposit">Deposit</option>
							<option value="withdrawal">Withdrawal</option>
							<option value="staking">Staking</option>
							<option value="purchase">Purchases</option>
						</select>

					</span>
					
					<DashboardTable getSlots={getSlots} activeModalTab={activeModalTab} isDataUpdated={isDataUpdated} />
				</div>
			</div>

		</>
	);
}

export default index;
