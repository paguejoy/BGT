import Head from "next/head";
import styles from "../styles/Home.module.css";
import NavBar from "../components/NavBar";
import { Container, Form, Button } from "react-bootstrap";
import Footer from "../components/Footer";
import { Fragment } from "react";
import Highlights from '../components/Highlights'
import "bootstrap/dist/css/bootstrap.min.css";


export default function Home() {
  return (
    <Fragment>
      <Container className="home">
        <h2>Welcome to Budget Tracking App</h2>
      </Container>
    </Fragment>
  );
}
