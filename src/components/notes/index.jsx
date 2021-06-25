import NoteForm from './NoteForm'
import Grid from './Grid'
import { Button, useDisclosure } from '@chakra-ui/react'
import { PlusIcon } from '@heroicons/react/outline'
import { Modal } from '../utils'

function Notes() {
	const { onOpen, isOpen, onClose } = useDisclosure()
	return (
		<>
			<Button onClick={() => onOpen()}>
				<span>
					<PlusIcon style={{ width: '1.2rem' }} />
				</span>
				<span>Add Note</span>
			</Button>
			<Grid />
			<Modal isOpen={isOpen} onClose={onClose}>
				<NoteForm />
			</Modal>
		</>
	)
}

export default Notes
