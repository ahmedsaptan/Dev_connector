import React, {Fragment, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import './App.css';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

//redux
import {Provider} from "react-redux";
import store from "./store";
import Alert from "./components/layout/Alert";
import setAuthToken from "./utils/setAuthToken";
import {loadUser} from "./actions/auth";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import CreateProfile from "./components/profile-forms/CreateProfile";

if(localStorage.token) {
	setAuthToken(localStorage.getItem('token'));
}
const App = () => {
	// now its look like componetDidMounted
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	return (
		<Provider store={store}>
			<Router>
				<Fragment>
					<Navbar />
					<Route exact path='/' component={Landing} />
					<section className='container'>
						<Alert/>
						<Switch>
							<Route exact path='/login' component={Login} />
							<Route exact path='/register' component={Register} />
							<PrivateRoute exact path="/dashboard" component={Dashboard}/>
							<PrivateRoute exact path="/create-profile" component={CreateProfile}/>
						</Switch>
					</section>
				</Fragment>
			</Router>
		</Provider>
	);
};

export default App;