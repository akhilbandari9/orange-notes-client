import { Suspense, lazy } from 'react'
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
} from 'react-router-dom'
import Sidebar from './components/sidebar'
import { NotesProvider } from './context/notes'

const Home = lazy(() => import('./pages/home'))
const Bin = lazy(() => import('./pages/bin'))
const FilteredNotes = lazy(() => import('./pages/filtered-notes'))

function App() {
	return (
		<main className='App'>
			<Router>
				<div className='App__sidebar'>
					<NotesProvider>
						<Sidebar />
					</NotesProvider>
				</div>
				<div className='App__page'>
					<Suspense fallback={<div>'Loading...'</div>}>
						<Switch>
							<Route path='/' exact>
								<Redirect to='/home' />
							</Route>
							<Route path='/home' component={Home} />
							<Route path='/label/:label' exact component={FilteredNotes} />
							<Route path='/bin' exact component={Bin} />
						</Switch>
					</Suspense>
				</div>
			</Router>
		</main>
	)
}

export default App
