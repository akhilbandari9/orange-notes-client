import { links } from '../../constants/components'
import { NavLink } from 'react-router-dom'

const menuItemStyles = {
	display: 'flex',
	alignItems: 'center',
	gap: '1rem',
}
const SidebarNav = () => {
	return (
		<nav className='Sidebar-nav'>
			{links.map((item) => (
				<li key={item.id}>
					<NavLink
						className='Sidebar__link'
						activeClassName='Sidebar__link-active'
						to={item.to}
					>
						<div style={menuItemStyles}>
							<span>
								<item.Icon style={{ width: '25px', height: '25px' }} />
							</span>
							<span>{item.name}</span>
						</div>
					</NavLink>
				</li>
			))}
		</nav>
	)
}

export default SidebarNav
