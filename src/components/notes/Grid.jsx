import { useEffect } from 'react'
import { useNotesContext } from '../../context/notes'
import useLoading from '../../hooks/useLoading'
import { Loading } from '../utils'

import Card from './Card'
const Grid = () => {
	const { getNotes, notes } = useNotesContext()
	const [loading, setLoading] = useLoading()
	useEffect(() => {
		async function fetchNotes() {
			setLoading(true)
			await getNotes()
			setLoading(false)
		}
		fetchNotes()
		// eslint-disable-next-line
	}, [])

	if (notes !== null && !loading && notes.length <= 0) {
		return <h3>You do not have any notes</h3>
	}

	return (
		<section>
			{!loading ? (
				<div className='grid'>
					{notes !== null &&
						notes.length > 0 &&
						notes.map((item) => <Card key={item._id} note={item} />)}
				</div>
			) : (
				<Loading colorScheme='orange' />
			)}
		</section>
	)
}

export default Grid
