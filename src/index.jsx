import React from 'react'
import ReactDOM from 'react-dom'
import { ChakraProvider } from '@chakra-ui/react'
import './styles/main.scss'
import App from './App'
import { NotesProvider } from './context/notes'

const main = async () => {
	try {
		fetch('https://notes-app-99.herokuapp.com/labels')
	} catch (err) {
		document.getElementById('root').innerHTML = '<p>No Internet</p>'
	}

	ReactDOM.render(
		<ChakraProvider>
			<NotesProvider>
				<App />
			</NotesProvider>
		</ChakraProvider>,
		document.getElementById('root')
	)
}
main()
