import {Form, Button,Container} from 'react-bootstrap'
import {useEffect, useContext, useState} from 'react'
import Swal from 'sweetalert2'


//import Router for redirection
import Router from 'next/router'

export default function Register(){

	//States for our input fields

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password1, setPassword1] = useState("");
	const [password2, setPassword2] = useState("");

	//State for conditionally rendering the submit button
	const [isActive, setIsActive] = useState(true)

	//useEffect that will run on every change to our input fields

	useEffect(()=>{

		if((firstName !== "" && lastName !=="" && email !==""  && password1 !=="" && password2 !== "") && (password1 === password2)){

			setIsActive(true)

		} else {

			setIsActive(false)
		}

	},[firstName, lastName, email, password1, password2])


	function registerUser(e){

		e.preventDefault();

		//check if an email already exists
		fetch('https://enigmatic-inlet-58613.herokuapp.com/api/users/email-exists',{

			method: 'POST',
			headers: {

				'Content-Type': 'application/json'
			},
			body: JSON.stringify({

				email: email
			})

		})
		.then(res=> res.json())
		.then(data =>{
			console.log(data)
	
			if(data === false){

				fetch('https://enigmatic-inlet-58613.herokuapp.com/api/users/register',{
						method: 'POST',
						headers: {'Content-Type': 'application/json'},
						body: JSON.stringify({
							firstName: firstName,
							lastName: lastName,
							email: email,
							password: password1
						})
					})
					.then(res=>res.json())
					.then(data=>{
						console.log(data);

						if(data){

							Swal.fire({

								icon: "success",
								title: "Successfully Registered.",
								text: "Thank you for Registering."
							})
							 Router.push('/login')

						} else {

							Swal.fire({

								icon: "error",
								title: "Regiration Unsuccessful.",
								text: "Please try again."
							})
						}
	
					})

			} else {

				Swal.fire({
								icon: "error",
								title: "Regiration Unsuccessful.",
								text: "Email already Exists"


				})
			}

		})

		   
							setFirstName("")
							setLastName("")
							setEmail("")
							setPassword1("")
							setPassword2("")


		
	}

	return(

		<Container>
			<Form onSubmit={e=> registerUser(e)} className="my-3">
				<Form.Group controlId="userFirstName">
					<Form.Label>First Name:</Form.Label>
					<Form.Control type="text" placeholder="Enter First Name" value={firstName} onChange={e=> setFirstName(e.target.value)} required/>
				</Form.Group>
				<Form.Group controlId="userLastName">
					<Form.Label>Last Name:</Form.Label>
					<Form.Control type="text" placeholder="Enter Last Name" value={lastName} onChange={e=> setLastName(e.target.value)} required/>
				</Form.Group>
				<Form.Group controlId="userEmail">
					<Form.Label>Email:</Form.Label>
					<Form.Control type="email" placeholder="Enter Email" value={email} onChange={e=> setEmail(e.target.value)} required/>
				</Form.Group>
				
				<Form.Group controlId="userPassword1">
					<Form.Label>Password:</Form.Label>																		
					<Form.Control type="password" placeholder="Enter Password" value={password1} onChange={e=> setPassword1(e.target.value)} required/>																									
				</Form.Group>
				<Form.Group controlId="userPassword2">
					<Form.Label> Confirm Password:</Form.Label>
					<Form.Control type="password" placeholder="Confirm Password" value={password2} onChange={e=> setPassword2(e.target.value)} required/>
				</Form.Group>
				{

					isActive
					?
					<Button variant="primary" type="submit"> Register</Button>

					:
					<Button variant="primary" type="submit" disabled> Register</Button>


				}
				
		 </Form>
	 </Container>
	)
}
