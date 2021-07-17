import NoteForm from './NoteForm'
import Grid from './Grid'
import { Button, useDisclosure } from '@chakra-ui/react'
import { PlusIcon } from '@heroicons/react/outline'
import { Modal } from '../utils'
import { useParams } from 'react-router-dom'
import { useNotesContext } from '../../context/notes'
import { useEffect } from 'react'
import useLoading from '../../hooks/useLoading'
import { Loading } from '../utils'
import Search from './Search'

function Notes() {
	const { onOpen, isOpen, onClose } = useDisclosure()
	const [loading, setLoading] = useLoading()
	const { label } = useParams()
	const { getNotes, notes } = useNotesContext()

	useEffect(() => {
		async function fetchNotes() {
			setLoading(true)
			await getNotes(label)
			setLoading(false)
		}
		fetchNotes()
		// eslint-disable-next-line
	}, [label])

	return (
		<div style={{ width: '100%' }}>
			<div className='actions-items'>
				<Search />
				<div className='add-note-btn'>
					<Button
						onClick={() => onOpen()}
						color='orange.400'
						variant='outline'
						colorScheme='orange'
					>
						<span>
							<PlusIcon style={{ width: '1.2rem', marginRight: '0.5rem' }} />
						</span>
						<span>Add Note</span>
					</Button>
				</div>
			</div>

			{!loading ? <Grid notes={notes} /> : <Loading colorScheme='orange' />}
			<Modal isOpen={isOpen} onClose={onClose}>
				<NoteForm />
			</Modal>
		</div>
	)
}

export default Notes
