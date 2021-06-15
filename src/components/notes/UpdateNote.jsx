import { Modal } from '../utils'
import TextareaAutosize from 'react-textarea-autosize'
import { useEffect, useState } from 'react'
import { useNotesContext } from '../../context/notes'
import { useToast } from '@chakra-ui/react'

const UpdateNote = ({ note, isOpen, onClose, setLoading }) => {
	const toast = useToast()
	const { updateNote, removeNote } = useNotesContext()
	const [title, setTitle] = useState(note?.title)
	const [body, setBody] = useState(note?.body)

	useEffect(() => {
		let timeout
		let id = note._id

		timeout = setTimeout(() => {
			updateNote(note._id, { title, body })
		}, 600)

		return () => {
			clearTimeout(timeout)
			if (title === '' && body === '') {
				async function removeIfEmpty() {
					setLoading(true)
					toast({
						title: 'Empty Note. Moving to Bin',
						position: 'bottom-left',
						status: 'error',
						duration: 4000,
					})
					await removeNote(id)
					setLoading(false)
				}
				removeIfEmpty()
			}
		}
		// eslint-disable-next-line
	}, [title, body])

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			{note && (
				<div className='create-note update-note'>
					<h3>Click to edit</h3>
					<div className='form-control'>
						<TextareaAutosize
							className='text-area-resizable'
							value={title}
							onChange={({ target }) => setTitle(target.value)}
						/>
					</div>
					<div className='form-control'>
						<TextareaAutosize
							className='text-area-resizable'
							value={body}
							onChange={({ target }) => setBody(target.value)}
						/>
					</div>
				</div>
			)}
		</Modal>
	)
}

export default UpdateNote
