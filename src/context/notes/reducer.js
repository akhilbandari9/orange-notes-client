import {
	REMOVE_NOTE,
	GET_NOTES,
	POST_NOTE,
	UPDATE_NOTE,
	ADD_NEW_LABEL,
	SET_SELECTED_LABELS,
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

		case ADD_NEW_LABEL:
			return {
				...state,
				labels: [action.payload, ...state.labels],
			}

		case SET_SELECTED_LABELS:
			return {
				...state,
				selectedLabels: action.payload,
			}

		default:
			return state
	}
}

export default notesReducer
