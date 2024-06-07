import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom';
import Root from '@/layouts/Root';
import Main from '@/layouts/Main';
import Auth from './layouts/Auth';
import Portfolio from './pages/Portfolio';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Home from './pages/Home';
import Search from './pages/Search';
import CoinScreen from './pages/CoinScreen';
import ForgotPassword from './pages/ForgetPassword';
import RootErrorBoundary from './components/common/RootErrorBoundary';

// providers
import ThemeProvider from './providers/ThemeProvider';
import AuthProvider from './providers/AuthProvider';

// loaders
import { homeLoader } from './loaders/homeLoader';
import { profileLoader } from './loaders/profileLoader';
import { coinScreenLoader } from './loaders/coinScreenLoader';

// actions
import { profileAction } from './actions/profileAction';
import { coinScreenAction } from './actions/coinScreenAction';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route
			path=''
			element={<Root />}
			errorElement={<RootErrorBoundary />}
		>
			<Route
				path=''
				element={<Main />}
			>
				<Route
					path='portfolio'
					element={<Portfolio />}
					loader={profileLoader}
					action={profileAction}
				/>
				<Route
					index
					element={<Home />}
					loader={homeLoader}
				/>
				<Route
					path='portfolio/:coinId'
					element={<CoinScreen />}
					loader={coinScreenLoader}
					action={coinScreenAction}
				/>
				<Route
					path='search'
					element={<Search />}
				/>
			</Route>
			{/* this route is temporary */}
			{/* <Route path="loading" element={<Loading />} />  */}
			<Route
				path=''
				element={<Auth />}
			>
				<Route
					path='signup'
					element={<Signup />}
				/>
				<Route
					path='signin'
					element={<Signin />}
				/>
				<Route
					path='reset'
					element={<ForgotPassword />}
				/>
			</Route>
			{/* <Route path="test" element={<Test />} /> */}
		</Route>
	)
);

function App() {
	return (
		<AuthProvider>
			<ThemeProvider>
				<RouterProvider router={router} />
			</ThemeProvider>
		</AuthProvider>
	);
}

export default App;
