import {useState, useEffect, useContext} from 'react'
import {Form, Button, Container} from 'react-bootstrap'
import Router from 'next/router'
import UserContext from './../../UserContext'
import {GoogleLogin} from 'react-google-login'
import Swal from 'sweetalert2'

export default function Login(){

	const {user, setUser} = useContext(UserContext);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [isActive, setIsActive] = useState(true);

	useEffect(()=>{

		if (email !== "" && password !== ""){

			setIsActive(true)
		} else {

			setIsActive(false)
		}
	}, [email, password])

	function authenticate(e){

		e.preventDefault();

		fetch('https://enigmatic-inlet-58613.herokuapp.com/api/users/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		})
		.then(res => res.json())
		.then(data => {
			if(data.accessToken){
				localStorage.setItem("token", data.accessToken)

				fetch('https://enigmatic-inlet-58613.herokuapp.com/api/users/details',{
					headers: {
						'Authorization': `Bearer ${data.accessToken}`
					}
				})
				.then(res => res.json())
				.then(data => {
					console.log(data)
					localStorage.setItem('email', data.email)
					localStorage.setItem('id', data._id)

					setUser({
						email: data.email,
						id: data._id
					})
				})

				Swal.fire({
					icon: 'success',
					title: 'Successfuly Logged in',
					text: 'Thank you for logging in.'
				})
				Router.push('/records')
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Log in failed',
					text: 'User Authentication failed'
				})
			}
		})

		setEmail("")
		setPassword("")
	}

	function authenticateGoogleToken(response){
		fetch('https://enigmatic-inlet-58613.herokuapp.com/api/users/verify-google-id-token',{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				tokenId: response.tokenId,
				accessToken: response.accessToken
			})
		})
		.then(res => res.json())
		.then(data => {
			if (typeof data.accessToken !== "undefined") {
				localStorage.setItem('token', data.accessToken)
				fetch('https://enigmatic-inlet-58613.herokuapp.com/api/users/details', {
					headers: {
						'Authorization': `Bearer ${data.accessToken}`
					}
				})
				.then(res => res.json())
				.then(data =>{
					localStorage.setItem('email', data.email)
					localStorage.setItem('id', data._id)

					setUser({
						email: data.email,
						id: data._id
					})

					Swal.fire({
						icon: 'success',
						title: 'Successfuly Login'
					})
					Router.push('/records')
				})
			} else {
				if(data.error === 'google-auth-error'){
					Swal.fire({
						icon: 'error',
						title: 'Google Authentication Failed'
					})
				} else if (data.error === 'login-type-error') {
					Swal.fire({
						icon: 'error',
						title: 'Login failed',
						text: 'You may registered through different platform'

					})
				}
			}
		})
	}

	return(
		<Container>
			<Form onSubmit={e => authenticate(e)}>
				<Form.Group controlId="userEmail">
		 			<Form.Label>Email:</Form.Label>
		 			<Form.Control type="email" placeholder="Enter Email" value={email} onChange={e =>setEmail(e.target.value)} required />
				</Form.Group>
				<Form.Group controlId="userPassword">
		 			<Form.Label>Password:</Form.Label>
		 			<Form.Control type="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)} required />
				</Form.Group>
				{
					isActive
					?
					<Button variant="primary" type="submit" className="btn-block">Submit</Button>
					:
					<Button variant="primary" disabled className="btn-block">Submit</Button>
				}
				<GoogleLogin 

					clientId="83506859368-ad1uv8v33311puidecljh1usl97sim7j.apps.googleusercontent.com"
					buttonText="Login Using Google"
					onSuccess={authenticateGoogleToken}
					onFailure={authenticateGoogleToken}
					cookiePolicy={'single_host_origin'}
					className="w-100 text-center my-4 d-flex justify-content-center"
				/>	
			</Form>
		</Container>
		)
}