import { Input, Button } from '@chakra-ui/react'
import { useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { useNotesContext } from '../../context/notes'
import useLoading from '../../hooks/useLoading'
import { Spinner } from '../utils'
import ColorPicker from './ColorPicker'
import LabelMenu from './LabelMenu'
import SelectedLabelBadges from './SelectedLabelBadges'

const NoteForm = () => {
	const { postNote, selectedLabels } = useNotesContext()
	const [loading, setLoading] = useLoading()

	const [title, setTitle] = useState('')
	const [body, setBody] = useState('')
	const [color, setColor] = useState('#ffffff')

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (title !== '' && body !== '') {
			setLoading(true)
			await postNote({ title, body, color, labels: selectedLabels })

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
				<div className='form-control'>
					<TextareaAutosize
						minRows={3}
						className='text-area-resizable'
						placeholder='Body'
						value={body}
						style={{ width: '100%' }}
						onChange={({ target }) => setBody(target.value)}
					/>
				</div>

				<div
					className=''
					style={{
						marginTop: '0.3rem',
						display: 'flex',
						gap: '1rem',
						width: '100%',
						alignItems: 'center',
					}}
				>
					<LabelMenu />
					<div className=''>
						<SelectedLabelBadges selectedLabelsList={selectedLabels} />
					</div>
				</div>
				<ColorPicker color={color} setColor={setColor} />

				<div className='form-control'>
					<Button size='sm' type='Submit' colorScheme='orange'>
						{loading ? <Spinner size='xs' /> : 'Save'}
					</Button>
				</div>
			</form>
		</div>
	)
}

export default NoteForm
