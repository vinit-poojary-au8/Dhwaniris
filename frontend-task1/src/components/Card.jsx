import React from 'react'

function Card({ item, index, removeCard }) {
	return (
		<div className='item'>
			{item.number}
			<button className={'submit'} onClick={() => removeCard(index)}>
				x
			</button>
		</div>
	)
}

export default Card
