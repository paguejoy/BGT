import { Jumbotron, Button, Container, Row, Col, Card } from "react-bootstrap";
import UserContext from "./../../UserContext";
import Head from "next/head";
import NavBar from "../../components/NavBar";
// import Footer from "../components/Footer";
import { Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function About() {
  return (
    <Fragment>
      <Jumbotron className="aboutOne">
        <h1 className="text-center">Budget Tracking App</h1>
      </Jumbotron>
      <Container>
        <Row>
          <Col>
            <Card className="cardHighlight">
              <Card.Body>
                <Card.Title>
                  <h2 className="text-center">Income flows</h2>
                </Card.Title>
                <Card.Text>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat. 
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="cardHighlight">
              <Card.Body>
                <Card.Title>
                  <h2 className="text-center">Logo</h2>
                </Card.Title>
                <Card.Text>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                  proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="cardHighlight">
              <Card.Body>
                <Card.Title>
                  <h2 className="text-center">Creator</h2>
                </Card.Title>
                <Card.Text>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat.  
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}
