import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Row, Col } from "react-bootstrap";
import moment from "moment";
 
export default function BarCharts() {
  const [months, setMonths] = useState([]);
  const [monthlyIncome, setMonthlyIncome] = useState([]);
  const [monthlyExpenses, setMonthlyExpenses] = useState([]);

  const [allTransactions, setAllTransactions] = useState([]);

  useEffect(() => {
    fetch(
      "https://enigmatic-inlet-58613.herokuapp.com/api/users/allTransactions",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setAllTransactions(data);
      });
  }, []);

  useEffect(() => {
    if (allTransactions.length > 0) {
      let tempMonths = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      allTransactions.forEach((element) => {
        if (
          !tempMonths.find(
            (month) => month === moment(element.recordedOn).format("MMMM")
          )
        ) {
          tempMonths.push(moment(element.sale_date).format("MMMM"));
        }
      });

      const monthsRef = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      tempMonths.sort((a, b) => {
        if (monthsRef.indexOf(a) !== -1 && monthsRef.indexOf(b) !== -1) {
          return monthsRef.indexOf(a) - monthsRef.indexOf(b);
        }
      });

      setMonths(tempMonths);
    }
  }, [allTransactions]);

  useEffect(() => {
    setMonthlyIncome(
      months.map((month) => {
        let income = 0;

        allTransactions.forEach((element) => {
          if (
            moment(element.recordedOn).format("MMMM") === month &&
            element.type === "Income"
          ) {
            income += parseInt(element.amount);
          }
        });
        return income;
      })
    );
  }, [months]);

  useEffect(() => {
    setMonthlyExpenses(
      months.map((month) => {
        let expense = 0;

        allTransactions.forEach((element) => {
          if (
            moment(element.recordedOn).format("MMMM") === month &&
            element.type === "Expense"
          ) {
            expense += parseInt(element.amount);
          }
        });
        return expense;
      })
    );
  }, [months]);

  const incomeData = {
    labels: months,
    datasets: [
      {
        label: "Annual Income",
        backgroundColor: "#1a53ff",
        borderColor: "black",
        borderWidth: 1,
        hoverBackgroundColor: "#1a53ff",
        hoverBorderColor: "#1a53ff",
        data: monthlyIncome,
      },
    ],
  };

  const expenseData = {
    labels: months,
    datasets: [
      {
        label: "Annual Expenses",
        backgroundColor: "#d147a3",
        borderColor: "black",
        borderWidth: 1,
        hoverBackgroundColor: "#d147a3",
        hoverBorderColor: "#d147a3",
        data: monthlyExpenses,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      <Row className="mt-5">
        <Col md={6}>
          <h2 className="text-center">Income</h2>
          <Bar data={incomeData} options={options} />
        </Col>
        <Col md={6}>
          <h2 className="text-center">Expenses</h2>
          <Bar data={expenseData} options={options} />
        </Col>
      </Row>
    </>
  );
}
