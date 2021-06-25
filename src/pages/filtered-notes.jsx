import Notes from '../components/notes'
import { NotesProvider } from '../context/notes'

const FilteredPage = () => {
	return (
		<main>
			<NotesProvider>
				<Notes />
			</NotesProvider>
		</main>
	)
}

export default FilteredPage
