import { Button } from '@chakra-ui/react'

const MyButton = ({ children, ...props }) => {
	return <Button {...props}>{children}</Button>
}

export default MyButton
