import {useState, useEffect, useContext} from 'react'
import {Form, Button, Container, Row, Col, Card} from 'react-bootstrap'
import Swal from 'sweetalert2'

import Router from 'next/router'
//import user context
import UserContext from './../../UserContext'

import Record from '../../components/Record'


export default function Records(){ // Replaced Categories to 'Records'

const {user} = useContext(UserContext)
console.log(user)

//State for token

const [userToken, setUserToken] = useState({

  setUserToken:null
})

//State for Category Type seletion
const [selection, setSelection] = useState("")
//State for Category Name selection
const [categoryNameSelection, setCategoryNameSelection] = useState([])
//State for final Category Name selection
const [categoryName, setCategoryName] = useState("")
//State for amount field
const [recordAmount, setRecordAmount] = useState(0);
//State for description field
const [recordDescription, setRecordDescription] = useState("");

//State for balance
const [balance, setBalance] = useState(0);

//State for Date
const [date, setDate] = useState("");

//State for the all records
    const [records,setRecords] = useState([]);

 //useEffect for the Token

      useEffect(()=>{

      setUserToken(localStorage.getItem('token'))


    },[])


//useEffect for Balance
      useEffect(()=>{


        fetch('https://enigmatic-inlet-58613.herokuapp.com/api/users/balance',{
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
  .then(res=> res.json())
  .then(data=>{

    setBalance(data)

  })

    },[balance])

      //useEffect for the all records

      useEffect(()=>{

      fetch('https://enigmatic-inlet-58613.herokuapp.com/api/users/allTransactions',{
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
  .then(res=> res.json())
  .then(data=>{

    setRecords(data)

  })


    },[])
console.log('Records',records)
     



const recordsArray = records.map(record=>{
  return(

      <Record key={record._id} recordProp={record} />
    )
})






const [allCategories, setAllCategories] = useState([])

useEffect(()=>{



  fetch('https://enigmatic-inlet-58613.herokuapp.com/api/users/allCategories',{
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
  .then(res=> res.json())
  .then(data =>{

    console.log(data)
    // setAllCategories(data)
    let incomeArray=[];
    let expenseArray=[];

    if(selection === "Income"){

      data.filter(result=>{
        if(result.type==="Income"){

            incomeArray.push({_id: result._id, name: result.name})
        }
      })

      setCategoryNameSelection(incomeArray)

    }else{

      data.filter(result=>{
        if(result.type==="Expense"){

            expenseArray.push({_id: result._id, name: result.name})
        }
      })

      setCategoryNameSelection(expenseArray)
    }




  })
},[selection])




// console.log(categoryNameSelection)

const categoriesSelect = categoryNameSelection.map(category=>{
  return(

      <option key={category._id}>{category.name}</option>
    )
})




function  addRecord(e){

  

e.preventDefault();
// console.log('userToken', userToken)
// console.log('selection',selection)
// console.log('categoryName',categoryName)

let newBalance= 0;

if(selection === "Income"){
  newBalance = balance + parseInt(recordAmount)
}else if(selection === "Expense"){
  newBalance= balance - parseInt(recordAmount)
}

console.log(newBalance)


fetch('https://enigmatic-inlet-58613.herokuapp.com/api/users/transaction',{
  method :'POST',
  headers: {
    'Content-Type':'application/json',
    'Authorization': `Bearer ${userToken}`
  },
  body: JSON.stringify({
    id:  user.id,
    type: selection,
    category: categoryName,
    amount: recordAmount,
    description: recordDescription,
    balance: newBalance,
    recordedOn:date
  })
})

.then(res => res.json())
.then(data =>{

  console.log('newBalance',data)

  fetch('https://enigmatic-inlet-58613.herokuapp.com/api/users/updateBalance',{
      method :'PUT',
      headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${userToken}`
      },
      body: JSON.stringify({
        id:  user.id,
        balance: newBalance
      })
    })
    .then(res =>res.json())
    .then(data =>{

      setBalance(newBalance)
    })


  if(data){

    Swal.fire({

            icon: "success",
            title: " Success!.",
            text: "New transaction is recorded."
          })
          setCategoryName("");
          setSelection("");
          setRecordAmount(0);
          setRecordDescription("");
          // Router.reload();
          window.location.replace('/records')



  }else{

      Swal.fire({

      icon: "error",
      title: "Posting transaction failed",
      text: "Please try again."
      })  
  }


})

          
          


}

  return(


    <Container>
      <Row>
        <Col xs={12} md={6} className="my-3">
          <h4 className="text-center my-3">Balance: PHP {balance}</h4>
          <h4>Add Transaction</h4>
          <Form onSubmit ={e => addRecord(e)}>

              <Form.Group controlId="selectionLabel">
                  <Form.Label>Category Type</Form.Label>
                  <Form.Control as="select" required value={selection} onChange={e=> setSelection(e.target.value)}>
                    <option value="" disabled >Please Select type</option>
                    <option>Income</option>
                    <option>Expense</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="selectionLabe2">
                  <Form.Label>Category Name</Form.Label>
                  <Form.Control as="select" value={categoryName} onChange={e=> setCategoryName(e.target.value)}>
                    <option value="" disabled>Select Category Name</option>

                    {categoriesSelect}

                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="camount">
                <Form.Label>Amount:</Form.Label>
                <Form.Control type="number" placeholder="Enter Amount"  value={recordAmount} onChange={e=> setRecordAmount(e.target.value)} required/>
              </Form.Group>
              <Form.Group controlId="cdesc">
                <Form.Label>Description:</Form.Label>
                <Form.Control type="text" placeholder="Enter Description"  value={recordDescription} onChange={e=> setRecordDescription(e.target.value)} required/>
              </Form.Group>
              <Form.Group controlId="cdate">
                <Form.Label>Date:</Form.Label>
                <Form.Control type="date" placeholder="Enter Date"  value={date} onChange={e=> setDate(e.target.value)} required/>
              </Form.Group>   
              <Button className="btn" variant="secondary" type="submit">Record Transaction</Button>
                
              
            </Form>
        </Col>
        <Col xs={12} md={6} className="my-3" className="cardHighlight">
         <h4 className="my-3">Transactions Overview:</h4>
          {recordsArray}
        </Col>
        
      </Row>
    </Container>
      


    )
}

