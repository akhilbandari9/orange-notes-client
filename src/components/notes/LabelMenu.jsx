import {
	Input,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Button,
} from '@chakra-ui/react'
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import { useNotesContext } from '../../context/notes'

const LabelMenu = () => {
	const { labels, addNewLabel, setSelectedLabels } = useNotesContext()
	const [typing, setTyping] = useState(false)
	const [newLabel, setNewLabel] = useState('')
	const [selectedLabelsList, setSelectedLabelsList] = useState([])

	const [checkedArr, setCheckedArr] = useState(() =>
		new Array(labels?.length).fill(false)
	)

	useEffect(() => {
		setSelectedLabelsList(
			labels !== null &&
				labels.filter((item, index) => checkedArr[index] && item)
		)
		// eslint-disable-next-line
	}, [checkedArr])

	useEffect(() => {
		setSelectedLabels(selectedLabelsList)
		// eslint-disable-next-line
	}, [selectedLabelsList])

	const handleCheckBoxChange = (currentIndex) => {
		labels !== null &&
			setCheckedArr((prev) =>
				prev.map((item, index) => (index === currentIndex ? !item : item))
			)
	}

	const handleMenuClose = () => {
		setNewLabel('')
		setTyping(false)
	}

	const handleNewLabelInput = ({ target }) => {
		setTyping(true)
		setNewLabel(target.value)
	}

	const saveNewLabel = (e) => {
		e.stopPropagation()
		if (addNewLabel(newLabel)) {
			setCheckedArr((prev) => [false, ...prev])
		}
		setTyping(false)
		setNewLabel('')
	}

	return (
		<div className=''>
			<div className='form-select'>
				<Menu colorScheme='orange' onClose={handleMenuClose}>
					<MenuButton
						as={Button}
						rightIcon={<ChevronDownIcon style={{ width: '1rem' }} />}
						fontSize='0.9rem'
						color='orange.500'
						bg='orange.50'
						_hover={{ bg: 'orange.100' }}
						_active={{ bg: 'orange.100' }}
					>
						Add Label
					</MenuButton>
					<MenuList padding='0.7rem'>
						<Input
							placeholder='Enter new label'
							focusBorderColor='orange.200'
							value={newLabel}
							onChange={handleNewLabelInput}
						/>
						{!typing ? (
							<div className='label-list' style={{ marginTop: '0.7rem' }}>
								{labels !== null &&
									labels.length > 0 &&
									labels.map((label, index) => (
										<div className='' key={label}>
											<MenuItem padding='0' borderRadius='5px'>
												<input
													type='checkbox'
													id={label}
													value={label}
													checked={checkedArr?.length > 0 && checkedArr[index]}
													onChange={() => handleCheckBoxChange(index)}
												/>
												<label
													style={{
														width: '100%',
														height: '100%',
														display: 'block',
														padding: '.3rem 1rem',
														cursor: 'pointer',
													}}
													htmlFor={label}
												>
													{label}
												</label>
											</MenuItem>
										</div>
									))}
							</div>
						) : (
							<div className='new-label-submit'>
								<div className=''>
									<Button
										fontSize='0.9rem'
										color='orange.500'
										bg='orange.50'
										_hover={{ bg: 'orange.100' }}
										_active={{ bg: 'orange.100' }}
										style={{ display: 'flex', alignItems: 'center' }}
										onClick={saveNewLabel}
									>
										<PlusIcon style={{ width: '1.2rem', height: '1.2rem' }} />

										{`Create "${newLabel}"`}
									</Button>
								</div>
							</div>
						)}
					</MenuList>
				</Menu>
			</div>
		</div>
	)
}

export default LabelMenu
