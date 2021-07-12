import { useContext, useReducer, createContext } from 'react'
import axios from 'axios'
import notesReducer from './reducer'
import { useToast } from '@chakra-ui/react'
import { NOTES, LABELS } from '../../constants/endpoints'
import { toastOptions } from '../../constants/components'
import {
	REMOVE_NOTE,
	GET_NOTES,
	POST_NOTE,
	UPDATE_NOTE,
	ADD_NEW_LABEL,
	SET_SELECTED_LABELS,
	SET_LABELS_ONLOAD,
	DELETE_LABEL,
} from '../types'

const NotesContext = createContext(null)

const NotesProvider = ({ children }) => {
	const toast = useToast()

	const initialState = {
		notes: null,
		labels: null,
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

	const setLabelsOnLoad = async () => {
		try {
			const res = await axios.get(LABELS, null)
			dispatch({
				type: SET_LABELS_ONLOAD,
				payload: res.data,
			})
		} catch (err) {
			toast({
				title: 'Failed Loading Labels',
				status: 'error',
				...toastOptions,
			})
		}
	}

	const addNewLabel = async (newLabel) => {
		if (newLabel.includes(' ')) {
			toast({
				title: 'No spaces allowed',
				status: 'error',
				...toastOptions,
			})
			return null
		} else if (newLabel.length > 0 && state.labels.includes(newLabel)) {
			toast({
				title: 'Label already exists',
				status: 'error',
				...toastOptions,
			})
			return null
		} else if (newLabel.length <= 0) {
			toast({
				title: 'Label cannot be empty',
				status: 'error',
				...toastOptions,
			})
			return null
		} else {
			dispatch({
				type: ADD_NEW_LABEL,
				payload: newLabel,
			})
			await axios.post(LABELS, { label: newLabel })
			return true
		}
	}

	const setSelectedLabels = (labelList) => {
		dispatch({
			type: SET_SELECTED_LABELS,
			payload: labelList,
		})
	}

	const deleteLabel = async (label) => {
		try {
			dispatch({
				type: DELETE_LABEL,
				payload: label,
			})
			await axios.delete(`${LABELS}/${label}`)

			toast({
				title: 'Label Deleted',
				status: 'warning',
				...toastOptions,
			})
		} catch (error) {
			toast({
				title: 'Error deleting label',
				status: 'error',
				...toastOptions,
			})
		}
	}

	// const searchNotes = async (searchTerm) => {
	// 	try {
	// 		const res = await axios.get(`${NOTES}?search=${searchTerm}`, null)

	// 		dispatch({
	// 			type: GET_NOTES,
	// 			payload: res.data,
	// 		})
	// 	} catch (error) {
	// 		toast({
	// 			title: 'Error Fetching Notes',
	// 			status: 'error',
	// 			...toastOptions,
	// 		})
	// 	}
	// }

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
				deleteLabel,
				// searchNotes,
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
