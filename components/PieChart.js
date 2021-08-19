import { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Row, Col } from "react-bootstrap";
import moment from "moment";

export default function PieChart() {
  const [totalIncome, setTotalIncome] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState([]);
  const [allTransactions, setAllTransactions] = useState([]);
 
  useEffect(() => {
    fetch(
      "https://enigmatic-inlet-58613.herokuapp.com/api/users/allTransactions",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => res.json())
      .then((data) => {
        setAllTransactions(data);
      });
  }, []);

  useEffect(() => {
    setTotalIncome(
      allTransactions.map((result) => {
        let income = 0;

        allTransactions.forEach((element) => {
          if (element.type === "Income") {
            income += parseInt(element.amount);
          }
        });
        return income;
      })
    );
  }, [allTransactions]);

  useEffect(() => {
    setTotalExpenses(
      allTransactions.map((result) => {
        let expense = 0;

        allTransactions.forEach((element) => {
          if (element.type === "Expense") {
            expense += parseInt(element.amount);
          }
        });
        return expense;
      })
    );
  }, [allTransactions]);

  const totalIncomeRes = totalIncome[0];
  const totalExpensesRes = totalExpenses[0];

  const data = {
    datasets: [
      {
        data: [totalIncomeRes, totalExpensesRes],
        backgroundColor: ["#1a53ff", "#d147a3"],
      },
    ],
    labels: ["Total Income", "Total Expenses"],
  };

  return (
    <>
      <Row>
        <Col md={6} className="offset-md-3">
          <Pie data={data} />
        </Col>
      </Row>
    </>
  );
}
