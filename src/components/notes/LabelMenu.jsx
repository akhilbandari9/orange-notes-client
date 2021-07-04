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

	useEffect(() => {
		setSelectedLabels(selectedLabelsList)
		// eslint-disable-next-line
	}, [selectedLabelsList])

	const handleCheckBoxChange = (currentLabel) => {
		if (labels == null) return
		setSelectedLabelsList((prev) => {
			if (prev.includes(currentLabel)) {
				return prev.filter((item) => item !== currentLabel)
			} else {
				return [...prev, currentLabel]
			}
		})
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
		addNewLabel(newLabel)
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
								{labels &&
									labels.length > 0 &&
									labels.map((label, index) => (
										<div key={label}>
											<MenuItem padding='0' borderRadius='5px'>
												<input
													type='checkbox'
													id={label}
													value={selectedLabelsList.includes(label)}
													onChange={() => handleCheckBoxChange(label)}
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
