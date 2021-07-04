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
const ManageLabels = lazy(() => import('./pages/manage-labels'))

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
						<NotesProvider>
							<Switch>
								<Route path='/' exact>
									<Redirect to='/home' />
								</Route>
								<Route path='/home' component={Home} />
								<Route path='/bin' exact component={Bin} />
								<Route path='/label/:label' exact component={FilteredNotes} />
								<Route path='/labels/manage' exact component={ManageLabels} />
							</Switch>
						</NotesProvider>
					</Suspense>
				</div>
			</Router>
		</main>
	)
}

export default App
