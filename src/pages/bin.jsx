import Bin from '../components/bin'
import { BinProvider } from '../context/bin'
const BinPage = () => {
	return (
		<main>
			<BinProvider>
				<Bin />
			</BinProvider>
		</main>
	)
}

export default BinPage
