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

const notesReducer = (state, action) => {
	switch (action.type) {
		case GET_NOTES:
			return {
				...state,
				notes: action.payload,
			}
		case POST_NOTE:
			return {
				...state,
				notes: [action.payload, ...state.notes],
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
		case SET_LABELS_ONLOAD:
			return {
				...state,
				labels: action.payload,
			}
		case ADD_NEW_LABEL:
			return {
				...state,
				labels: [...state.labels, action.payload],
			}
		case SET_SELECTED_LABELS:
			return {
				...state,
				selectedLabels: action.payload,
			}

		case DELETE_LABEL:
			return {
				...state,
				notes: state.labels.filter((item) => item !== action.payload),
			}

		default:
			return state
	}
}

export default notesReducer
