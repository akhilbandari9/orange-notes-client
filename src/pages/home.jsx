import Notes from '../components/notes'
import { NotesProvider } from '../context/notes'

const HomePage = () => {
	return (
		<main>
			<NotesProvider>
				<Notes />
			</NotesProvider>
		</main>
	)
}

export default HomePage
