import { Progress } from '@chakra-ui/react'

const Loading = ({ ...props }) => {
	return (
		<div style={{ width: '60%', margin: '2rem auto' }}>
			<Progress size='sm' isIndeterminate {...props} />
		</div>
	)
}

export default Loading
