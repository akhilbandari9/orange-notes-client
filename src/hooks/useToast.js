import { useToast } from '@chakra-ui/react'

const useToast = (title, status) => {
	const toast = useToast()
	toast({
		title: 'Note Added',
		duration: 1500,
		position: 'bottom-left',
		status: 'success',
		isClosable: true,
	})
	return null
}

export default useToast
