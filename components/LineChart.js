import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";


export default function LineChart() {

	const [balance, setBalance] = useState([]);
	const [lineData, setLineData] = useState({});
	const [allTransaction, setAllTransaction] = useState([]);


	useEffect(() => {
		fetch('https://enigmatic-inlet-58613.herokuapp.com/api/users/allTransactions',{
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)
			setAllTransaction(data);
		})
	},[])


	useEffect(()=> {
		setBalance(allTransaction.map(balance =>{
			return balance.balance
		}))
	}, [allTransaction]);

	const chartBalance = {
    labels: balance,
    datasets: [
      {
        label: "Balance Trend",
        backgroundColor: "#1a53ff",
        borderColor: "black",
        borderWidth: 1,
        hoverBackgroundColor: "#1a53ff",
        hoverBorderColor: "#1a53ff",
        data: balance,
      },
    ],
  };

	return(
		<>
			<h1>Balance Trend</h1>
			<Line data={chartBalance} />
		</>
		)
	
}