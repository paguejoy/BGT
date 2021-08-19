import{useState, useEffect, useContext} from 'react'
import {Card} from 'react-bootstrap'


// To get the prop, destructure it
export default function Category({categoryProp}){

	//  after you get the prop, destructure it para makuha mo yng laman na need mo:
	const {name, type} = categoryProp

	return(

			<Card className="my-3">
				<Card.Body>
					<Card.Title>
						{name}
					</Card.Title>
					<Card.Text>
						{type}
					</Card.Text>
				</Card.Body>
			</Card>
		)
}