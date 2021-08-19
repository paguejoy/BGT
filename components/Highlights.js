import { Row, Col, Card } from "react-bootstrap";

export default function Highlights() {
  return (
    <Row>
      <Col>
        <Card className="cardHighlight">
          <Card.Body>
            <Card.Title>
              <h2>Transactions </h2>
            </Card.Title>
            <Card.Text></Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card className="cardHighlight">
          <Card.Body>
            <Card.Title>
              <h2>Records</h2>
            </Card.Title>
            <Card.Text></Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
