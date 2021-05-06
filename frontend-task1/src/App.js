import './App.css'
import React, { useState } from 'react'
import Card from './components/Card'
import Form from './components/Form'

function App() {
	const [items, setItems] = useState([])

	const addCard = (number) => {
		const newItems = [...items, { number }]
		setItems(newItems)
	}

	const removeCard = (index) => {
		const newItems = [...items]
		newItems.splice(index, 1)
		setItems(newItems)
	}

	return (
		<div className='App'>
			<Form addCard={addCard} />
			{items.map((item, index) => (
				<Card
					key={index}
					index={index}
					item={item}
					removeCard={removeCard}
				/>
			))}
		</div>
	)
}

export default App
