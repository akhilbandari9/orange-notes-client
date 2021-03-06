import { MenuIcon } from '@heroicons/react/outline'
import {
	Drawer,
	DrawerBody,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	Button,
	useDisclosure,
	Box,
} from '@chakra-ui/react'
import SidebarNav from './SidebarNav'
import SidebarLabels from './SidebarLabels'

const Sidebar = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()

	return (
		<aside>
			<Box
				className='drawer'
				display={['flex', 'flex', 'none', 'none']}
				position='fixed'
				top='15px'
				left='15px'
				zIndex='10'
				background='orange.50'
			>
				<Button
					onClick={() => onOpen()}
					color='orange.400'
					variant='outline'
					colorScheme='orange'
				>
					<MenuIcon style={{ width: '25px', height: '25px' }} />
				</Button>
				<Drawer isOpen={isOpen} placement='left' onClose={onClose}>
					<DrawerOverlay />

					<DrawerContent>
						<DrawerCloseButton />
						<DrawerBody>
							<SidebarNav />
							<SidebarLabels />
						</DrawerBody>
					</DrawerContent>
				</Drawer>
			</Box>
			<Box
				className='navbar'
				display={['none', 'none', 'flex', 'flex']}
				flex
				flexDirection='column'
			>
				<SidebarNav />
				<SidebarLabels />
			</Box>
		</aside>
	)
}

export default Sidebar
