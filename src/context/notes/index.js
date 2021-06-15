import { useContext, useReducer, createContext } from 'react'
import axios from 'axios'
import notesReducer from './reducer'
import { useToast } from '@chakra-ui/react'

import { NOTES, BIN } from '../../constants/endpoints'
import {
	REMOVE_NOTE,
	GET_BIN_NOTES,
	GET_NOTES,
	POST_NOTE,
	UPDATE_NOTE,
	DELETE_BIN_NOTE,
	RESTORE_NOTE,
	CLEAR_BIN_NOTES,
} from '../types'

const NotesContext = createContext(null)

const NotesProvider = ({ children }) => {
	const initialState = {
		notes: null,
		binNotes: null,
		selectedNote: null,
	}
	const [state, dispatch] = useReducer(notesReducer, initialState)
	const toast = useToast()
	const toastOptions = {
		duration: 4000,
		position: 'bottom-left',
		isClosable: true,
	}
	const getNotes = async () => {
		try {
			const res = await axios.get(`${NOTES}`, null)
			dispatch({
				type: GET_NOTES,
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

	const postNote = async (note) => {
		try {
			const res = await axios.post(`${NOTES}`, note)
			dispatch({
				type: POST_NOTE,
				payload: res.data,
			})
			toast({
				title: 'Note Added',
				status: 'success',
				...toastOptions,
			})
		} catch (err) {
			toast({
				title: 'Error adding Note',
				status: 'error',
				...toastOptions,
			})
		}
	}
	const removeNote = async (id) => {
		try {
			await axios.delete(`${NOTES}/${id}`)
			dispatch({
				type: REMOVE_NOTE,
				payload: id,
			})

			toast({
				title: 'Note Moved to Bin',
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
	const updateNote = async (id, updatedNote) => {
		try {
			const res = await axios.put(`${NOTES}/${id}`, {
				...updatedNote,
				_id: id,
				updated: new Date(),
			})

			dispatch({
				type: UPDATE_NOTE,
				payload: res.data,
			})
		} catch (err) {
			toast({
				title: 'Error updating Note',
				status: 'error',
				...toastOptions,
			})
		}
	}

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
				title: 'Error moving to bin',
				status: 'error',
				...toastOptions,
			})
		}
	}

	return (
		<NotesContext.Provider
			value={{
				notes: state.notes,
				binNotes: state.binNotes,
				getNotes,
				postNote,
				removeNote,
				updateNote,
				getBinNotes,
				deleteBinNote,
				restoreNote,
				clearBin,
			}}
		>
			{children}
		</NotesContext.Provider>
	)
}

const useNotesContext = () => {
	return useContext(NotesContext)
}

export { NotesProvider, useNotesContext }
