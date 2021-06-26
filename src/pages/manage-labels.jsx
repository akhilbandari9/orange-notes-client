import { XIcon } from '@heroicons/react/outline'
import { useEffect } from 'react'
import { Loading } from '../components/utils'
import { useNotesContext } from '../context/notes'
const ManageLabels = () => {
	const { labels, setLabelsOnLoad, deleteLabel } = useNotesContext()

	useEffect(() => {
		setLabelsOnLoad()
		//eslint-disable-next-line
	}, [labels])

	const handleDeleteLabel = (label) => {
		deleteLabel(label)
	}

	return (
		<section className='label-card'>
			{labels ? (
				<div className='label-card__list'>
					{labels.length > 0 ? (
						labels.map((item) => (
							<div key={item} className='label-card__item'>
								<p className='label-card__name'>{item}</p>
								<span
									className='label-card__icon'
									onClick={() => handleDeleteLabel(item)}
								>
									<XIcon style={{ height: 'inherit', width: 'inherit' }} />
								</span>
							</div>
						))
					) : (
						<p>No labels</p>
					)}
				</div>
			) : (
				<Loading />
			)}
		</section>
	)
}

export default ManageLabels
