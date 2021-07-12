import { Input } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useNotesContext } from '../../context/notes'

const Search = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const { searchNotes } = useNotesContext()
	useEffect(() => {
		if (searchTerm.length > 2) {
			searchNotes(searchTerm)
		}
		// eslint-disable-next-line
	}, [searchTerm])

	return (
		<div className='' style={{ width: '300px' }}>
			<Input
				placeholder='Title'
				focusBorderColor='orange.200'
				value={searchTerm}
				onChange={({ target }) => setSearchTerm(target.value)}
			/>
		</div>
	)
}

export default Search
