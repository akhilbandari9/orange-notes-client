import { TrashIcon, PencilIcon } from '@heroicons/react/outline'
import { Spinner } from '../utils'
import { useNotesContext } from '../../context/notes'
import useLoading from '../../hooks/useLoading'
import { useDisclosure } from '@chakra-ui/react'
import UpdateNote from './UpdateNote'

const Card = ({ note }) => {
	const { removeNote } = useNotesContext()
	const [loading, setLoading] = useLoading()
	const { isOpen, onClose, onOpen } = useDisclosure()

	const handleDelete = async (e) => {
		e.preventDefault()
		e.stopPropagation()
		setLoading(true)
		await removeNote(note._id)
		setLoading(false)
	}

	const handleEdit = () => {
		onOpen()
	}

	return (
		<div className='card' onClick={() => onOpen()}>
			<div className='card-body'>
				<h2 className='card-title'>{note.title}</h2>
				<p className='card-body'>{note.body.slice(0, 180)}</p>
			</div>

			<div className='card-wrapper'>
				<div className='card-footer'>
					<span onClick={handleEdit}>
						<PencilIcon />
					</span>
					<span onClick={handleDelete}>
						<TrashIcon />
					</span>
				</div>
			</div>
			{loading ? (
				<div className='overlay-spinner'>
					<Spinner size='lg' />
				</div>
			) : null}
			{isOpen && (
				<UpdateNote
					note={note}
					isOpen={isOpen}
					onClose={onClose}
					setLoading={setLoading}
				/>
			)}
		</div>
	)
}

export default Card
