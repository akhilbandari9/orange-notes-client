import { Link } from 'react-router-dom'

const NotFound = () => {
	return (
		<div style={{ marginLeft: '30px' }}>
			<h1 style={{ fontSize: '24px', marginBottom: '10px' }}>
				Page not Found.
			</h1>
			<p>
				<span>Go to </span>
				<Link to='/home'>
					<span style={{ color: 'orange', textDecoration: 'underline' }}>
						home
					</span>
				</Link>
			</p>
		</div>
	)
}

export default NotFound
