import { XIcon } from '@heroicons/react/outline'
import { useEffect, useRef } from 'react'
import { Loading } from '../components/utils'
import { useNotesContext } from '../context/notes'
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react'

const ManageLabels = () => {
	const { labels, setLabelsOnLoad, deleteLabel, addNewLabel } =
		useNotesContext()
	const inputRef = useRef(null)
	useEffect(() => {
		setLabelsOnLoad()
		//eslint-disable-next-line
	}, [])

	const handleDeleteLabel = (label) => {
		deleteLabel(label)
	}
	const handleSubmit = (e) => {
		e.preventDefault()
		inputRef.current.value && addNewLabel(inputRef.current.value)
		inputRef.current.value = ''
	}

	return (
		<section className='label-card'>
			<form
				method='POST'
				onSubmit={handleSubmit}
				style={{ margin: '0 auto', width: '300px', marginBottom: '30px' }}
			>
				<InputGroup size='md'>
					<Input
						placeholder='Enter New Label'
						focusBorderColor='orange.200'
						ref={inputRef}
					/>
					<InputRightElement width='4rem'>
						<Button size='md' type='submit' colorScheme='orange'>
							Add
						</Button>
					</InputRightElement>
				</InputGroup>
			</form>

			{labels ? (
				<div className='label-card__list'>
					{labels.length > 0 ? (
						labels.map((item) => (
							<div key={item} className='label-card__item'>
								<p className='label-card__name'>{item}</p>
								<span
									className='label-card__icon'
									onClick={() => handleDeleteLabel(item)}
								>
									<XIcon style={{ height: 'inherit', width: 'inherit' }} />
								</span>
							</div>
						))
					) : (
						<p>No labels</p>
					)}
				</div>
			) : (
				<Loading />
			)}
		</section>
	)
}

export default ManageLabels
