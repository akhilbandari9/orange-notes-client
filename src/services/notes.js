import axios from 'axios'
import { NOTES } from '../constants/endpoints'

export const getNotes = async () => {
	let res, error

	try {
		res = await axios.get(`${NOTES}`, null)
	} catch (err) {
		error = err.msg
	}

	return { res: res?.data, error }
}

export const postNewNote = async (note) => {
	let res, error

	try {
		res = await axios.post(`${NOTES}`, note)
	} catch (err) {
		error = err.msg
	}

	return { res: res?.data, error }
}

export const deleteNote = async (id) => {
	let res, error

	try {
		res = await axios.delete(`${NOTES}/${id}`)
	} catch (err) {
		error = err.msg
	}

	return { res: res?.data, error }
}
