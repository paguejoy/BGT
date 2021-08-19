import { useState, useEffect, useContext } from "react";
import { Card } from "react-bootstrap";

// To get the prop, destructure it
export default function Category({ recordProp }) {
  //  after you get the prop, destructure it para makuha mo yng laman na need mo:
  const {
    _id,
    name,
    type,
    category,
    balance,
    recordedOn,
    description,
    amount,
  } = recordProp;

  return (
    <Card className="my-3">
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text><h5>Type: {type}</h5></Card.Text>
        <Card.Title><h5>Category: {category}</h5></Card.Title>
        <Card.Text><h5>Description: {description}</h5></Card.Text>
        <Card.Text><h5>Amount: {amount}</h5></Card.Text>
        <Card.Text><h5>Balance: {balance}</h5></Card.Text>
        <Card.Text><h5>Date: {recordedOn}</h5></Card.Text>
      </Card.Body>
    </Card>
  );
}
