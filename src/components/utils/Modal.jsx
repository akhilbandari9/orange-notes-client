import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalCloseButton,
} from '@chakra-ui/react' //chakra modal uses react portal

const MyModal = ({ children, ...restProps }) => {
	return (
		<Modal {...restProps} motionPreset='slideInBottom' size='xl'>
			<ModalOverlay />
			<ModalContent>
				<ModalCloseButton />
				{children}
			</ModalContent>
		</Modal>
	)
}

export default MyModal
