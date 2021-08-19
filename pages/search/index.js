import {useState,useEffect} from 'react'
import {Container, Row, Col, Card} from 'react-bootstrap'
import {Form,Button,Jumbotron} from 'react-bootstrap'


export default function Transactions(){

const [allTransactions, setAllTransactions] = useState([])
const [search,setSearch] = useState("")
const [filteredTrans,setFilteredTrans] = useState([])
const [records,setRecords] = useState([])
const [positive,setPositive] = useState([])
const [negative,setNegative] = useState([])
const [selector,setSelector] = useState("")

  useEffect(()=>{



    fetch('https://enigmatic-inlet-58613.herokuapp.com/api/users/allTransactions',{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {

      setAllTransactions(data)
    })
  },[])

  useEffect(() => {

    setFilteredTrans(
      allTransactions.filter(transaction => {
        return transaction.description.toLowerCase().includes(search.toLowerCase())
      })
      )

  },[search,allTransactions])

  useEffect(() => {

    fetch('https://enigmatic-inlet-58613.herokuapp.com/api/users/allTransactions',{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {
      
      const allArr = []
      const incomesArr = []
      const expensesArr = []

      if(selector === "Income"){
        data.filter(result => {
          if(result.type === "Income"){
            incomesArr.push(result)
          }
        })
        setRecords(incomesArr)
      } else if (selector === "Expenses"){
        data.filter(result => {
          if(result.type === "Expense"){
            expensesArr.push(result)
          }
        })
        setRecords(expensesArr)
      } else if (selector === "All"){
        data.filter(result => {
          allArr.push(result)
        })
        setRecords(allArr)
      }
        
      })

  },[selector])

  const recordsArr = records.map(record => {

    return <Card key={record._id} className="mt-3">
          <Card.Body>
            <Card.Text>{record.category}</Card.Text>
            <Card.Text>{record.type}: {record.amount}</Card.Text>
            <Card.Text>{record.description}</Card.Text>
          </Card.Body>
        </Card>
  })

  const finalFilter = filteredTrans.map(result => {

    return <Card key={result._id} className="mt-3">
          <Card.Body>
            <Card.Text>{result.category}</Card.Text>
            <Card.Text>{result.type}: {result.amount}</Card.Text>
            <Card.Text>{result.description}</Card.Text>
          </Card.Body>
        </Card>
  })

  const positiveData = records.map(pos => {
    if(pos.type == "Income"){
      return parseInt(pos.amount)
    }
  })

  const negativeData = records.map(neg => {
    if(neg.type == "Expense"){
      return -Math.abs(parseInt(neg.amount))
    }
  })

  const posNeg = positiveData.concat(negativeData)
  const filteredPosNeg = posNeg.filter(data => {
    return data != undefined
  })

  const balance = filteredPosNeg.reduce((accumulator,currentValue) => {
    return accumulator + currentValue
  },0)

    return(
      <>
        <h1 className="text-center">Transactions</h1>
        <Container>
          <Row>
            <Col md={6} className="text-center">
              <h2>History</h2>
              <Form>
                <Form.Group controlId="transaction-filter">
                    <Form.Control as="select" value={selector} onChange={e => setSelector(e.target.value)}>
                    <option value="" disabled >Please Select type</option>
                    <option>All</option>
                    <option>Income</option>
                    <option>Expenses</option>
                    </Form.Control>
                  </Form.Group>
              </Form>
              <Jumbotron className="recordsArr">
              {recordsArr}
              </Jumbotron>
            </Col>
            <Col md={6} className="text-center">
              <h2>Search</h2>
              <Form>
                <Form.Group controlId="transaction-category">
                    <Form.Control type="text" value={search} placeholder="Search by Description" onChange={e => setSearch(e.target.value)} required />
                    <Jumbotron className="mt-3 recordsArr">
                    <h4>Records</h4>
                    {finalFilter}
                    </Jumbotron>
                  </Form.Group>
              </Form>
            </Col>
          </Row>
        </Container>
      </>

      )

  }

