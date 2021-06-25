import {
	GET_BIN_NOTES,
	DELETE_BIN_NOTE,
	RESTORE_NOTE,
	CLEAR_BIN_NOTES,
} from '../types'

const binReducer = (state, action) => {
	switch (action.type) {
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

export default binReducer
