import React, { useState } from 'react'

function Form({ addCard }) {
	const [number, setNumber] = useState('')

	const handleSubmit = (e) => {
		e.preventDefault()
		if (!number) return
		addCard(number)
		setNumber('')
	}
	// const handleNumber = (e, index) => {
	// 	const newValue = e.target.value
	// 	setNumber([...number, newValue])
	// }

	return (
		<form className='inputContainer' onSubmit={handleSubmit}>
			<label className='cardText'>Card Number*</label>
			{[...Array(4)].map((_, index) => (
				<input
					key={index}
					type='text'
					className='cardInput'
					onChange={(e) => setNumber(e.target.value)}
					maxLength='4'
				/>
			))}
			<button type='submit' className='submit'>
				submit
			</button>
		</form>
	)
}

export default Form
