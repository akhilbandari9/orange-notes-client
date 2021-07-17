import { Input } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useNotesContext } from '../../context/notes'

const Search = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const { getNotes } = useNotesContext()
	useEffect(() => {
		if (searchTerm.length < 2) {
			getNotes()
		} else if (searchTerm.length >= 2) {
			getNotes(null, searchTerm)
		}
		// eslint-disable-next-line
	}, [searchTerm])

	return (
		<div className=''>
			<Input
				placeholder='Search'
				focusBorderColor='orange.200'
				value={searchTerm}
				borderColor='orange'
				_hover={{ borderColor: 'orange' }}
				color='orange.400'
				variant='outline'
				colorScheme='orange'
				onChange={({ target }) => setSearchTerm(target.value)}
			/>
		</div>
	)
}

export default Search
