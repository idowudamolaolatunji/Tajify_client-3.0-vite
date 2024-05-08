import React, { useEffect, useState } from "react";

// import { useAuthContext } from "../context/AuthContext";
import DataTable from "react-data-table-component";
import { currencyConverter, dateConverter } from "../../../utils/helper";
import { BiSolidSortAlt } from "react-icons/bi";
import MainSpinner from "../../../components/MainSpinner";
import { useAuthContext } from "../../../context/AuthContext";

function Message({ type }) {
	 return (<p className="no-pcontent-message">No {type} transactions</p>)
}
const sortIcon = <BiSolidSortAlt />;
const customStyles = {
    rows: {
        style: {
            minHeight: '58px',
        },
    },
}

function DashboardTable({ activeModalTab, isDataUpdated, getSlots }) {
	const { token } = useAuthContext();
	const [isLoading, setIsLoading] = useState(false);

	const [depositTransactions, setDepositTransactions] = useState([]);
	const [withdrawalTransactions, setWithdrawalTransactions] = useState([]);
	const [statkingTransactions, setStatkingTransactions] = useState([]);
	const [purchaseTransactions, setPurchaseTransactions] = useState([]);

	const columns = [
		{
			name: `${activeModalTab === "staking" ? "Trx Type" : "Currency Paid"}`,
			selector: (row) => (activeModalTab === "staking" ? row.type : row.currency),
			sortable: activeModalTab === "staking" ? false : true,
		},
		{
			name: `${activeModalTab === "staking" ? "Paid TAJI" : "Amount"}`,
			selector: (row) => (
				`${
					row.type === "staking"
						? "TAJI "
						: row.currency === "naira"
						? "₦"
						: row.currency === "taji"
						? "TAJI "
						: "$"
				}${currencyConverter(row.amount)}`
			),
			sortable: true,
		},
		...(activeModalTab === "staking"
			? [
					{
						name: "Slots Bought",
						selector: (row) => row.slots,
					},
			  ]
			: []),

		{
			name: "Transaction Status",
			// selector: (row) => row.status,
			selector: (row) => (
				<span className={`status status--${row.status === "pending" ? "pending" : "success"}`}>
					<p>{row.status}</p>
				</span>
			),
			sortable: true,
		},
		{
			name: "Reference",
			selector: (row) => row.reference,
		},
		{
			name: "Date",
			selector: (row) => dateConverter(row.createdAt),
			sortable: true,
		},
	];

	const userStakeSlots = statkingTransactions.reduce((acc, slot) => acc + slot.slots, 0);
	getSlots(userStakeSlots);

	useEffect(() => {
		async function fetchTransactions() {
			const headers = {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			};
			try {
				setIsLoading(true);
				const [depositRes, withdrawalRes, stakingRes, purchaseRes] = await Promise.all([
					fetch(`${import.meta.env.VITE_SERVER_URL}/transactions/deposits`, { headers }),
					fetch(`${import.meta.env.VITE_SERVER_URL}/transactions/withdrawals`, { headers }),
					fetch(`${import.meta.env.VITE_SERVER_URL}/transactions/stakings`, { headers }),
					fetch(`${import.meta.env.VITE_SERVER_URL}/transactions/purchases`, { headers }),
				]);

				if (!depositRes.ok || !withdrawalRes.ok || !stakingRes.ok || !purchaseRes.ok) {
					setIsLoading(false);
					return;
				}
				const depositData = await depositRes.json();
				const withdrawalData = await withdrawalRes.json();
				const stakingData = await stakingRes.json();
				const purchaseData = await purchaseRes.json();

				// GET THE DATA OBJ ([])
				const deposits = depositData.data.myTransactions;
				const withdrawals = withdrawalData.data.myTransactions;
				const stakings = stakingData.data.myTransactions;
				const purchases = purchaseData.data.myTransactions;
				console.log(purchases)
				setIsLoading(false);
				setDepositTransactions(deposits);
				setWithdrawalTransactions(withdrawals);
				setStatkingTransactions(stakings);
				setPurchaseTransactions(purchases);
			} catch (err) {
				setIsLoading(false);
			}
		}

		fetchTransactions();
	}, [isDataUpdated]);

	return (
		<>
			{isLoading && <MainSpinner />}

			{activeModalTab === "deposit" && (
				<DataTable
					columns={columns}
					data={depositTransactions}
					sortIcon={sortIcon}
					pagination
					selectableRows
					noDataComponent={<Message type={'deposit'} />}
					customStyles={customStyles}
				/>
			)}
			{activeModalTab === "withdrawal" && (
				<DataTable
					columns={columns}
					data={withdrawalTransactions}
					sortIcon={sortIcon}
					pagination
					selectableRows
					noDataComponent={<Message type={'withdrawal'} />}
					customStyles={customStyles}
				/>
			)}
			{activeModalTab === "staking" && (
				<DataTable
					columns={columns}
					data={statkingTransactions}
					sortIcon={sortIcon}
					pagination
					selectableRows
					noDataComponent={<Message type={'staking'} />}
					customStyles={customStyles}
				/>
			)}
			{activeModalTab === "purchase" && (
				<DataTable
					columns={columns}
					data={purchaseTransactions}
					sortIcon={sortIcon}
					pagination
					selectableRows
					noDataComponent={<Message type={'purchase'} />}
					customStyles={customStyles}
				/>
			)}
		</>
			
	);
}

export default DashboardTable;
