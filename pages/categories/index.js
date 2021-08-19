import {useState, useEffect, useContext} from 'react'
import Category from '../../components/Category'
import {Form, Button, Container, Row, Col, Card} from 'react-bootstrap'
import Swal from 'sweetalert2'

import Router from 'next/router'
//import user context
import UserContext from './../../UserContext'


export default function Categories(){

const {user} = useContext(UserContext)
console.log(user)

const [selection, setSelection] = useState("")
const [categoryName , setCategoryName] = useState("")

//State for the token
    const [userToken,setUserToken] = useState({
   
       userToken: null

    })

 //useEffect for the Token

      useEffect(()=>{

      setUserToken(localStorage.getItem('token'))


    },[])



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
    setAllCategories(data)
  })
},[])




console.log(allCategories)

const categoriesCards = allCategories.map(category=>{
  return(

      <Category key = {category._id} categoryProp = {category} />
    )
})




function  selectType(e){

  

e.preventDefault();
console.log('userToken', userToken)
console.log('selection',selection)
console.log('categoryName',categoryName)



fetch('https://enigmatic-inlet-58613.herokuapp.com/api/users/category',{
  method :'POST',
  headers: {
    'Content-Type':'application/json',
    'Authorization': `Bearer ${userToken}`
  },

  body: JSON.stringify({
    userId:  user.id,
    name: categoryName,
    type: selection 



  })
})

.then(res => res.json())
.then(data =>{

  console.log(data)


  if(data){

    Swal.fire({

                icon: "success",
                title: " New Category name successfully created.",
                text: "Thank you for adding a new course."
              })
              window.location.replace('/categories');


  }else{

        Swal.fire({

                icon: "error",
                title: "Category Creation failed",
                text: "Please try again."
              })  
  }


})

          
          setCategoryName("");
          setSelection("Income");


}

  return(


    <Container>
      <Row>
        <Col xs={12} md={6} className="my-3">
          <h4>Add Income / Expense Category</h4>
          <Form onSubmit ={e => selectType(e)}>
              <Form.Group controlId="cname">
                <Form.Label>Category  Name:</Form.Label>
                <Form.Control type="text" placeholder="Enter Category Name"  value={categoryName} onChange={e=> setCategoryName(e.target.value)} required/>
              </Form.Group>
              <Form.Group controlId="selectionLabel">
                  <Form.Label>Category Type</Form.Label>
                  <Form.Control as="select" value={selection} onChange={e=> setSelection(e.target.value)}>
                    <option value="" disabled >Please Select Type</option>
                    <option>Income</option>
                    <option>Expense</option>
                  </Form.Control>
                </Form.Group>
              
              <Button className="btn" variant="secondary" type="submit">Create Category</Button>
                
              
            </Form>
        </Col>
        <Col xs={12} md={6} className="my-3">
        <h4>Categories Overview</h4>
          {categoriesCards}
        </Col>
      </Row>
    </Container>
      


    )
}

