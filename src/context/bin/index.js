import { useContext, useReducer, createContext } from 'react'
import axios from 'axios'
import binReducer from './reducer'
import { useToast } from '@chakra-ui/react'

import { BIN } from '../../constants/endpoints'
import {
	GET_BIN_NOTES,
	DELETE_BIN_NOTE,
	RESTORE_NOTE,
	CLEAR_BIN_NOTES,
} from '../types'

const BinContext = createContext(null)

const toastOptions = {
	duration: 4000,
	position: 'bottom-left',
	isClosable: true,
}

const BinProvider = ({ children }) => {
	const toast = useToast()

	const initialState = {
		binNotes: null,
	}
	const [state, dispatch] = useReducer(binReducer, initialState)

	const getBinNotes = async () => {
		try {
			const res = await axios.get(`${BIN}`, null)
			dispatch({
				type: GET_BIN_NOTES,
				payload: res.data,
			})
		} catch (err) {
			toast({
				title: 'Failed Loading Notes',
				status: 'error',
				...toastOptions,
			})
		}
	}
	const deleteBinNote = async (id) => {
		try {
			await axios.delete(`${BIN}/p/${id}`)
			dispatch({
				type: DELETE_BIN_NOTE,
				payload: id,
			})
			toast({
				title: 'Note Deleted Permanently',
				status: 'warning',
				...toastOptions,
			})
		} catch (err) {
			toast({
				title: 'Error moving to bin',
				status: 'error',
				...toastOptions,
			})
		}
	}
	const clearBin = async () => {
		try {
			await axios.delete(`${BIN}/delete/all`)
			dispatch({
				type: CLEAR_BIN_NOTES,
			})
			toast({
				title: 'Emptied Bin',
				status: 'success',
				...toastOptions,
			})
		} catch (err) {
			toast({
				title: 'Error Clearing',
				status: 'error',
				...toastOptions,
			})
		}
	}
	const restoreNote = async (id) => {
		try {
			await axios.delete(`${BIN}/${id}`)
			dispatch({
				type: RESTORE_NOTE,
				payload: id,
			})
			toast({
				title: 'Note Restored',
				status: 'success',
				...toastOptions,
			})
		} catch (err) {
			toast({
				title: 'Error restoring Note',
				status: 'error',
				...toastOptions,
			})
		}
	}

	return (
		<BinContext.Provider
			value={{
				binNotes: state.binNotes,
				getBinNotes,
				deleteBinNote,
				restoreNote,
				clearBin,
			}}
		>
			{children}
		</BinContext.Provider>
	)
}

const useBinContext = () => {
	return useContext(BinContext)
}

export { BinProvider, useBinContext }
