import React, { useState } from 'react'

function Form({ addCard }) {
	const [inputNumber, setInputNumber] = useState({})

	const handleSubmit = (e) => {
		e.preventDefault()
		if (Object.keys(inputNumber).length !== 4) {
			alert('Please input 16 digit Card Number')
			return
		}
		let number = ''
		for (let num in inputNumber) {
			number += inputNumber[num]
		}
		addCard(number)
		setInputNumber({})
		let allInput = document.querySelectorAll('.cardInput')
		allInput.forEach((element) => (element.value = ''))
	}
	const handleNumber = (e) => {
		const { id, value, maxLength } = e.target
		if (value.length >= maxLength) {
			setInputNumber({ ...inputNumber, [id]: value })
			const nextInput = document.getElementById(parseInt(id) + 1)
			if (nextInput !== null) {
				nextInput.focus()
			}
		}
	}

	return (
		<form className='inputContainer' onSubmit={handleSubmit}>
			<label className='cardText'>Card Number*</label>
			{[...Array(4)].map((_, index) => (
				<input
					key={index}
					id={`${index}`}
					type='text'
					className='cardInput'
					onChange={handleNumber}
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
