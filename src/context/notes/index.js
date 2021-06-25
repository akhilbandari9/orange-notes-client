import { useContext, useReducer, createContext } from 'react'
import axios from 'axios'
import notesReducer from './reducer'
import { useToast } from '@chakra-ui/react'
import { NOTES } from '../../constants/endpoints'

import {
	REMOVE_NOTE,
	GET_NOTES,
	POST_NOTE,
	UPDATE_NOTE,
	ADD_NEW_LABEL,
	SET_SELECTED_LABELS,
} from '../types'

const NotesContext = createContext(null)

const toastOptions = {
	duration: 4000,
	position: 'bottom-left',
	isClosable: true,
}

const NotesProvider = ({ children }) => {
	const toast = useToast()

	const initialState = {
		notes: null,
		selectedNote: null,
		labels: ['Important', 'Work', 'Personal'],
		selectedLabels: [],
	}
	const [state, dispatch] = useReducer(notesReducer, initialState)

	const getNotes = async (label) => {
		try {
			let res
			if (label === undefined) {
				res = await axios.get(`${NOTES}`, null)
			} else {
				res = await axios.get(`${NOTES}/labels?label=${label}`, null)
			}

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
			if (updatedNote.body === '' && updatedNote.title === '') {
				setTimeout(async () => {
					dispatch({
						type: REMOVE_NOTE,
						payload: id,
					})
					await axios.delete(`${NOTES}/${id}`)
				}, 3500)

				setTimeout(
					() =>
						toast({
							title: 'Empty Note. Moved to Bin',
							status: 'warning',
							...toastOptions,
						}),
					3000
				)
			} else {
				const res = await axios.put(`${NOTES}/${id}`, {
					...updatedNote,
					_id: id,
					updated: new Date(),
				})

				dispatch({
					type: UPDATE_NOTE,
					payload: res.data,
				})
			}
		} catch (err) {
			toast({
				title: 'Error updating Note',
				status: 'error',
				...toastOptions,
			})
		}
	}

	const setLabelsOnLoad = async () => {}

	const addNewLabel = async (newLabel) => {
		//TODO: add a new labels to server
		dispatch({
			type: ADD_NEW_LABEL,
			payload: newLabel,
		})
	}

	const setSelectedLabels = (labelList) => {
		dispatch({
			type: SET_SELECTED_LABELS,
			payload: labelList,
		})
	}

	return (
		<NotesContext.Provider
			value={{
				notes: state.notes,
				labels: state.labels,
				selectedLabels: state.selectedLabels,
				getNotes,
				postNote,
				removeNote,
				updateNote,
				addNewLabel,
				setSelectedLabels,
				setLabelsOnLoad,
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
