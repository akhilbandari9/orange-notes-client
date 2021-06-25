import { useEffect } from 'react'
import { useBinContext } from '../../context/bin'
import useLoading from '../../hooks/useLoading'
import BinCard from './BinCard'
import { Loading, Button } from '../utils'

const Bin = () => {
	const { getBinNotes, binNotes, clearBin } = useBinContext()
	const [loading, setLoading] = useLoading()

	useEffect(() => {
		const apiRequest = async () => {
			setLoading(true)
			await getBinNotes()
			setLoading(false)
		}
		apiRequest()
		// eslint-disable-next-line
	}, [])

	const handleClearBin = async () => {
		await clearBin()
	}

	if (binNotes !== null && !loading && binNotes.length <= 0) {
		return (
			<h3
				style={{
					margin: '2rem auto',
					fontSize: '1.5rem',
					fontWeight: '500',
					textAlign: 'center',
				}}
			>
				Bin is Empty
			</h3>
		)
	}
	return (
		<main>
			{loading ? (
				<Loading colorScheme='gray' />
			) : (
				<section className='' style={{ margin: '0 auto' }}>
					{binNotes && (
						<>
							{binNotes.length > 0 && (
								<div
									style={{
										display: 'flex',
										justifyContent: 'flex-end',
										marginRight: '2rem',
									}}
								>
									<Button onClick={handleClearBin}>Clear Bin</Button>
								</div>
							)}

							<div className='grid'>
								{binNotes.map((item) => (
									<BinCard key={item._id} note={item} />
								))}
							</div>
						</>
					)}
				</section>
			)}
		</main>
	)
}

export default Bin
