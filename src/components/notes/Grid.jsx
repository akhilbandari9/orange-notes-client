import Card from './Card'

const Grid = ({ notes }) => {
	return (
		<section>
			<div className='grid'>
				{notes !== null && notes.length <= 0 ? (
					<h3 style={{ margin: '1rem auto', fontSize: '20px' }}>
						Notes not found
					</h3>
				) : (
					notes?.map((item) => <Card key={item._id} note={item} />)
				)}
			</div>
		</section>
	)
}

export default Grid
