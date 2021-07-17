import { TrashIcon, PencilIcon, ShareIcon } from '@heroicons/react/outline'
import { NotesProvider, useNotesContext } from '../../context/notes'
import useLoading from '../../hooks/useLoading'
import { useDisclosure } from '@chakra-ui/react'
import UpdateNote from './UpdateNote'
import { Modal } from '../utils'
import ShareNote from './ShareNote'
import { useRef } from 'react'

const Card = ({ note }) => {
	const { title, body, _id, color, labels } = note
	const { removeNote } = useNotesContext()
	const [loading, setLoading] = useLoading()
	const { isOpen, onClose, onOpen } = useDisclosure()
	const modalType = useRef('edit') //tells which modal to open

	const handleDelete = async (e) => {
		e.preventDefault()
		e.stopPropagation()
		setLoading(true)
		removeNote(_id)
	}

	const handleEdit = (e) => {
		e.preventDefault()
		e.stopPropagation()
		modalType.current = 'edit'
		onOpen()
	}

	const handleShare = (e) => {
		e.preventDefault()
		e.stopPropagation()
		modalType.current = 'share'
		onOpen()
	}

	return (
		<div
			className={`card ${loading ? ' inactive' : ''}`}
			style={{ background: color }}
			onClick={() => {
				modalType.current = 'edit'
				onOpen()
			}}
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
					<span onClick={handleShare}>
						<ShareIcon />
					</span>
					<span onClick={handleEdit}>
						<PencilIcon />
					</span>
					<span onClick={handleDelete}>
						<TrashIcon />
					</span>
				</div>
			</div>
			{loading ? <div className='overlay'></div> : null}

			<OpenModal
				modalType={modalType.current}
				isOpen={isOpen}
				onClose={onClose}
				note={note}
			/>
		</div>
	)
}

export default Card

const OpenModal = ({ modalType, isOpen, onClose, note }) => {
	return (
		<NotesProvider>
			{isOpen && (
				<Modal isOpen={isOpen} onClose={onClose}>
					{modalType === 'share' ? (
						<ShareNote note={note} onClose={onClose} />
					) : modalType === 'edit' ? (
						<UpdateNote note={note} onClose={onClose} />
					) : null}
				</Modal>
			)}
		</NotesProvider>
	)
}
