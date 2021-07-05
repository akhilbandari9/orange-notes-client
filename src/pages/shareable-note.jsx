import { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'

const ShareableNote = () => {
	const id = window.location.pathname.slice(6)

	const noteUrl = `https://notes-app-99.herokuapp.com/notes/${id}`

	const [loading, setLoading] = useState(false)
	const [note, setNote] = useState({})

	useEffect(() => {
		async function fetchFromApi(noteUrl) {
			setLoading(true)
			const res = await fetch(noteUrl)
			const note = await res.json()
			console.log(note)
			setNote(note)
			setLoading(false)
		}
		fetchFromApi(noteUrl)
	}, [id])

	if (loading) return <p>Loading ...</p>

	return (
		<div>
			<h1>{note.title}</h1>
			<p>{note.body}</p>
		</div>
	)
}

export default ShareableNote

{
	/* <Route
					path='/note/:id'
					exact
					component={() =>
						ReactDOM.render(<ShareableNote />, document.getElementById('root'))
					}
				/> */
}
