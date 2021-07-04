import React from 'react'
import ReactDOM from 'react-dom'
import { ChakraProvider } from '@chakra-ui/react'

import './styles/main.scss'

import App from './App'
import { NotesProvider } from './context/notes'

ReactDOM.render(
	<ChakraProvider>
		<NotesProvider>
			<App />
		</NotesProvider>
	</ChakraProvider>,
	document.getElementById('root')
)
