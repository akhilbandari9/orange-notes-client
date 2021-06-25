import { HomeIcon, TrashIcon } from '@heroicons/react/outline'
import { HOME, BIN } from './routes'
export const colors = [
	{
		id: 1,
		name: 'gray',
		color: '#F3F4F6',
	},
	{
		id: 2,
		name: 'yellow',
		color: '#FEF3C7',
	},
	{
		id: 3,
		name: 'indigo',
		color: '#E0E7FF',
	},
	{
		id: 4,
		name: 'pink',
		color: '#FCE7F3',
	},
	{
		id: 5,
		name: 'white',
		color: '#ffffff',
	},
]

export const links = [
	{
		id: 1,
		name: 'Home',
		to: HOME,
		Icon: HomeIcon,
	},
	{
		id: 2,
		name: 'Bin',
		to: BIN,
		Icon: TrashIcon,
	},
]
