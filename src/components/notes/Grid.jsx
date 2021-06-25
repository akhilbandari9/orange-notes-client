import Card from './Card'

const Grid = ({ notes }) => {
	if (notes !== null && notes.length <= 0) {
		return <h3>You do not have any notes</h3>
	}

	return (
		<section>
			<div className='grid'>
				{notes !== null &&
					notes.length > 0 &&
					notes.map((item) => <Card key={item._id} note={item} />)}
			</div>
		</section>
	)
}

export default Grid
