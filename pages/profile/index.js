import { useState, useEffect, useContext } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Jumbotron,
} from "react-bootstrap";
import Swal from "sweetalert2";

import Router from "next/router";
//import user context
import UserContext from "./../../UserContext";

export default function Profile() {
  const { user } = useContext(UserContext);
  console.log(user);

  //State for token

  const [userToken, setUserToken] = useState({
    setUserToken: null,
  });

  //useEffect for the Token

  useEffect(() => {
    setUserToken(localStorage.getItem("token"));
  }, []);

  console.log(userToken);

  //State for the User details
  const [userRecord, setUserRecord] = useState([]);

  //useEffect for User Details
  useEffect(() => {
    fetch("https://enigmatic-inlet-58613.herokuapp.com/api/users/details", {
      headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
      },
    })
      .then(res=> res.json())
      .then( data => {
        console.log(data);
        setUserRecord(data);
      });
  }, []);

  console.log(userRecord);

  return (
    <Container>
      <Jumbotron className="text-center my-5 ProfileJumbo">
        <h3>First Name: {userRecord.firstName}</h3>
        <h3>Last Name: {userRecord.lastName}</h3>
        <h3>Email: {userRecord.email}</h3>
        <h3>Current Balance: PHP: {userRecord.balance}</h3>
      </Jumbotron>
    </Container>
  );
}
