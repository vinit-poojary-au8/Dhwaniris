window.addEventListener('load', () => {
	const Box_1 = document.querySelector('.box_1')
	const Box_2 = document.querySelector('.box_2')
	const Box_3 = document.querySelector('.box_3')
	const Box_4 = document.querySelector('.box_4')
	const Box_5 = document.querySelector('.box_5')

	let click = (event) => {
		if (event.target.style.zIndex === 1) {
			document.getElementById(event.target.id).setAttribute(
				'style',
				'z-index:2'
			)
		} else {
			document.getElementById(event.target.id).setAttribute(
				'style',
				'z-index:1'
			)
		}
	}

	Box_1.addEventListener('click', click)
	Box_2.addEventListener('click', click)
	Box_3.addEventListener('click', click)
	Box_4.addEventListener('click', click)
	Box_5.addEventListener('click', click)
})
