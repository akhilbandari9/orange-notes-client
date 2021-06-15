import {
	REMOVE_NOTE,
	GET_NOTES,
	POST_NOTE,
	UPDATE_NOTE,
	GET_BIN_NOTES,
	DELETE_BIN_NOTE,
	RESTORE_NOTE,
	CLEAR_BIN_NOTES,
} from '../types'

const notesReducer = (state, action) => {
	switch (action.type) {
		case GET_NOTES:
			return {
				...state,
				notes: action.payload,
				loading: false,
			}
		case POST_NOTE:
			return {
				...state,
				notes: [action.payload, ...state.notes],
				loading: false,
			}
		case REMOVE_NOTE:
			return {
				...state,
				notes: state.notes.filter((item) => item._id !== action.payload),
			}
		case UPDATE_NOTE:
			return {
				...state,
				notes: state.notes.map((item) =>
					item._id === action.payload._id ? action.payload : item
				),
			}

		case GET_BIN_NOTES:
			return {
				...state,
				binNotes: action.payload,
			}
		case DELETE_BIN_NOTE:
		case RESTORE_NOTE:
			return {
				...state,
				binNotes: state.binNotes.filter((item) => item._id !== action.payload),
			}

		case CLEAR_BIN_NOTES:
			return {
				...state,
				binNotes: [],
			}

		default:
			return state
	}
}

export default notesReducer
