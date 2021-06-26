import { useNotesContext } from '../../context/notes'
import { TagIcon } from '@heroicons/react/outline'
import { NavLink } from 'react-router-dom'
import { Spinner } from '@chakra-ui/react'

const menuItemStyles = {
	display: 'flex',
	alignItems: 'center',
	gap: '1rem',
}
const SidebarLabels = () => {
	const { labels } = useNotesContext()

	return (
		<div>
			{labels !== null ? (
				<nav>
					{labels.length > 0 ? (
						<div className='Sidebar-labels'>
							{labels.map((item) => (
								<li key={item}>
									<NavLink
										className='Sidebar-labels__link'
										activeClassName='Sidebar-labels__active'
										to={`/label/${item}`}
									>
										<div style={menuItemStyles}>
											<span>
												<TagIcon style={{ width: '20px', height: '20px' }} />
											</span>
											<span>{item}</span>
										</div>
									</NavLink>
								</li>
							))}
						</div>
					) : (
						<p style={{ fontSize: '12px' }}>No Labels</p>
					)}
				</nav>
			) : (
				<Spinner
					color='orange.300'
					size='sm'
					marginTop='20px'
					label='Loading...'
				/>
			)}
		</div>
	)
}

export default SidebarLabels