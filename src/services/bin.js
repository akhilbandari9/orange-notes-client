import axios from 'axios'
import { BIN } from '../constants/endpoints'

export const getBinNotes = async () => {
	let res, error
	try {
		res = await axios.get(BIN)
	} catch (err) {
		error = err.msg
	}
	return { res: res.data, error }
}
