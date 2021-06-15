import { Input, Button } from '@chakra-ui/react'
import { useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { useNotesContext } from '../../context/notes'
import useLoading from '../../hooks/useLoading'
import { Spinner } from '../utils'

const CreateNote = () => {
	const { postNote } = useNotesContext()
	const [loading, setLoading] = useLoading()
	const [title, setTitle] = useState('')
	const [body, setBody] = useState('')

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (title !== '' && body !== '') {
			setLoading(true)
			await postNote({ title, body })

			setTitle('')
			setBody('')
			setLoading(false)
		}
	}
	return (
		<div className='create-note'>
			<h1>Take a note</h1>
			<form method='POST' className='form' onSubmit={handleSubmit}>
				<Input
					placeholder='Title'
					focusBorderColor='orange.200'
					value={title}
					onChange={({ target }) => setTitle(target.value)}
				/>

				<div className='form-wrap'>
					<div className='form-control'>
						<TextareaAutosize
							minRows={3}
							className='text-area-resizable'
							placeholder='Body'
							value={body}
							onChange={({ target }) => setBody(target.value)}
						/>
					</div>
					<div className='form-control'>
						<Button size='sm' type='Submit' colorScheme='orange'>
							{loading ? <Spinner size='xs' /> : 'Save'}
						</Button>
					</div>
				</div>
			</form>
		</div>
	)
}

export default CreateNote
