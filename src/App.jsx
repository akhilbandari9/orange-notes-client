import { Suspense, lazy } from 'react'
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
} from 'react-router-dom'
import Sidebar from './components/sidebar'

const Home = lazy(() => import('./pages/home'))
const Bin = lazy(() => import('./pages/bin'))
const FilteredNotes = lazy(() => import('./pages/filtered-notes'))
const ManageLabels = lazy(() => import('./pages/manage-labels'))
const NotFoundPage = lazy(() => import('./pages/not-found'))

function App() {
	return (
		<main className='App'>
			<Router>
				<div className='App__sidebar'>
					<Sidebar />
				</div>
				<div className='App__page'>
					<Suspense fallback={<div>'Loading...'</div>}>
						<Switch>
							<Route path='/' exact>
								<Redirect to='/home' />
							</Route>
							<Route path='/home' component={Home} />
							<Route path='/bin' exact component={Bin} />
							<Route path='/label/:label' exact component={FilteredNotes} />
							<Route path='/labels/manage' exact component={ManageLabels} />
							<Route component={NotFoundPage} />
						</Switch>
					</Suspense>
				</div>
			</Router>
		</main>
	)
}

export default App
