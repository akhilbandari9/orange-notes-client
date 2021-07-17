import TextareaAutosize from 'react-textarea-autosize'
import { useEffect, useState, useRef } from 'react'
import { useNotesContext } from '../../context/notes'
import { XIcon } from '@heroicons/react/outline'
import ColorPicker from './ColorPicker'

const { parseISO, formatDistanceStrict } = require('date-fns')

const UpdateNote = ({ note }) => {
	const { updateNote } = useNotesContext()
	const [title, setTitle] = useState(note.title)
	const [body, setBody] = useState(note.body)
	const [noteLabels, setNoteLabels] = useState(note.labels)
	const [color, setColor] = useState(note.color)

	const isMounted = useRef(false)

	const handleDeleteLabel = (selectedLabel) => {
		setNoteLabels((prev) => prev.filter((item) => item !== selectedLabel))
	}

	useEffect(() => {
		let timeout
		if (isMounted.current) {
			timeout = setTimeout(async () => {
				await updateNote(note._id, { title, body, labels: noteLabels, color })
			}, 600)
		} else {
			isMounted.current = true
		}

		return () => clearTimeout(timeout)
		// eslint-disable-next-line
	}, [title, body, color, noteLabels])

	return (
		<>
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
					<div className='badge-container'>
						{noteLabels.length > 0 &&
							noteLabels.map((item) => (
								<p key={item} className='badge'>
									<span>{item}</span>
									<span>
										<XIcon
											className='badge-icon'
											onClick={() => handleDeleteLabel(item)}
										/>
									</span>
								</p>
							))}
					</div>
					<div className='form-control'>
						<TextareaAutosize
							className='text-area-resizable'
							value={body}
							onChange={({ target }) => setBody(target.value)}
						/>
					</div>
					<div className='' style={{ marginTop: '20px' }}>
						<ColorPicker color={color} setColor={setColor} />
					</div>
					<div className='updated-at'>
						{'updated ' +
							formatDistanceStrict(parseISO(note.updated), new Date()) +
							' ago'}
					</div>
				</div>
			)}
		</>
	)
}

export default UpdateNote
