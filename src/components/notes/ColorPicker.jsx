import { options } from '../../constants/components'

const ColorPicker = ({ color, setColor }) => {
	const handleColorChange = ({ target }) => setColor(target.value)
	return (
		<div className='form-radio-group'>
			{options.map((item) => (
				<div className='form-radio' key={item.id}>
					<input
						className='radio-input'
						type='radio'
						name='radio'
						id={`color-radio-${item.id}`}
						checked={color === item.color}
						value={item.color}
						onChange={handleColorChange}
					/>
					<label
						className='radio-label'
						htmlFor={`color-radio-${item.id}`}
						style={{ background: item.color }}
					></label>
				</div>
			))}
		</div>
	)
}

export default ColorPicker
