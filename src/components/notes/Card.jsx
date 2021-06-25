import { TrashIcon, PencilIcon } from '@heroicons/react/outline'
import { useNotesContext } from '../../context/notes'
import useLoading from '../../hooks/useLoading'
import { useDisclosure } from '@chakra-ui/react'
import UpdateNote from './UpdateNote'
import { Modal } from '../utils'

const Card = ({ note }) => {
	const { title, body, _id, color, labels } = note
	const { removeNote } = useNotesContext()
	const [loading, setLoading] = useLoading()
	const { isOpen, onClose, onOpen } = useDisclosure()

	const handleDelete = async (e) => {
		e.preventDefault()
		e.stopPropagation()
		setLoading(true)
		removeNote(_id)
	}

	const handleEdit = (e) => {
		e.preventDefault()
		e.stopPropagation()
		onOpen()
	}

	return (
		<div
			className={`card ${loading ? ' inactive' : ''}`}
			style={{ background: color }}
			onClick={() => onOpen()}
		>
			<div className='card-body'>
				<h2 className='card-title'>{title}</h2>
				<div className='card-labels'>
					{labels.length > 0 &&
						labels.map((item) => (
							<p key={item} className='badge'>
								{item}
							</p>
						))}
				</div>
				<pre className='card-body'>{body.slice(0, 180)}</pre>
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
			{loading ? <div className='overlay'></div> : null}
			{isOpen && (
				<Modal isOpen={isOpen} onClose={onClose}>
					<UpdateNote note={note} onClose={onClose} />
				</Modal>
			)}
		</div>
	)
}

export default Card
