import {
	Button,
	InputGroup,
	InputRightElement,
	Textarea,
	useToast,
} from '@chakra-ui/react'
import { ClipboardCopyIcon } from '@heroicons/react/outline'
import { useRef } from 'react'
import { toastOptions } from '../../constants/components'

const ShareNote = ({ note }) => {
	const inputRef = useRef(null)
	const SHAREABLE_LINK = `https://notes-app-99.herokuapp.com/notes/${note._id}`
	const toast = useToast()

	const handleCopy = () => {
		inputRef.current?.select()
		inputRef.current?.setSelectionRange(0, 99999)
		document.execCommand('copy')
		toast({
			title: 'Link Copied to Clipboard',
			status: 'success',
			...toastOptions,
		})
	}

	return (
		<div className='share-note'>
			<h3>Share Note</h3>
			<div className='form-control'>
				<InputGroup size='md'>
					<Textarea
						placeholder='Enter New Label'
						focusBorderColor='orange.200'
						value={SHAREABLE_LINK}
						cursor='text'
						onFocus={() => {
							inputRef.current?.select()
							inputRef.current?.setSelectionRange(0, 99999)
						}}
						ref={inputRef}
						readOnly
						resize='none'
					/>
					<InputRightElement>
						<Button
							colorScheme='orange'
							margin='0.5rem'
							title='Copy To Clipboard'
							onClick={handleCopy}
						>
							<span>
								<ClipboardCopyIcon style={{ width: '1.2rem' }} />
							</span>
						</Button>
					</InputRightElement>
				</InputGroup>
				<Button
					size='sm'
					color='orange.400'
					variant='outline'
					colorScheme='orange'
					marginTop='30px'
				>
					<a href={SHAREABLE_LINK} target='_blank' rel='noreferrer'>
						Open In New tab
					</a>
				</Button>
			</div>
		</div>
	)
}

export default ShareNote
