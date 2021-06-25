import { TrashIcon, RefreshIcon } from '@heroicons/react/outline'
import { useBinContext } from '../../context/bin'
import useLoading from '../../hooks/useLoading'

const BinCard = ({ note }) => {
	const { deleteBinNote, restoreNote } = useBinContext()
	const [loading, setLoading] = useLoading()

	const handleDelete = async (e) => {
		e.preventDefault()

		setLoading(true)
		await deleteBinNote(note._id)
		setLoading(false)
	}
	const handleRestore = async (e) => {
		e.preventDefault()

		setLoading(true)
		await restoreNote(note._id)
		setLoading(false)
	}

	return (
		<div className={`card bin ${loading ? ' inactive' : ''}`}>
			<div className='card-body'>
				<h2 className='card-title'>{note.title}</h2>
				<p className='card-body'>{note.body.slice(0, 180)}</p>
			</div>

			<div className='card-wrapper'>
				<div className='card-footer bin-footer'>
					<span>
						<RefreshIcon onClick={handleRestore} />
					</span>
					<span>
						<TrashIcon onClick={handleDelete} />
					</span>
				</div>
			</div>
			{loading ? <div className='overlay'></div> : null}
		</div>
	)
}

export default BinCard
