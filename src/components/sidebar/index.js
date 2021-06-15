import { NavLink } from 'react-router-dom'
import { HOME, BIN } from '../../constants/routes'
const links = [
	{
		id: 1,
		name: 'Home',
		to: HOME,
	},
	{
		id: 2,
		name: 'Bin',
		to: BIN,
	},
]

const Sidebar = () => {
	return (
		<aside className='Sidebar'>
			<nav className='Sidebar-nav'>
				{links.map((item) => (
					<li key={item.id}>
						<NavLink
							className='Sidebar__link'
							activeClassName='Sidebar__link-active'
							to={item.to}
						>
							{item.name}
						</NavLink>
					</li>
				))}
			</nav>
		</aside>
	)
}

export default Sidebar
