import BarCharts from "../../components/Barchart";
import PieChart from "../../components/PieChart";
import LineChart from "../../components/LineChart"
import { Jumbotron, Row } from "react-bootstrap";

export default function Charts() {
  return (
    <Jumbotron className="text-center PCont">
    
      <h1>Monthly Income & Expenses </h1>
      <PieChart />
    
    
      <h1>Yearly Income & Expenses</h1>
      <BarCharts />

      <LineChart />
    
    </Jumbotron>
  );
}
