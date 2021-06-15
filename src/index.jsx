import React from 'react'
import ReactDOM from 'react-dom'
import { ChakraProvider } from '@chakra-ui/react'

import './styles/main.scss'

import App from './App'

ReactDOM.render(
	<ChakraProvider>
		<App />
	</ChakraProvider>,
	document.getElementById('root')
)
