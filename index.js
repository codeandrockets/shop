import React from 'react'
import { Router, Route, hashHistory } from 'react-router'
import { render } from 'react-dom'
import App from './modules/App'
import About from './modules/About'
import Repos from './modules/Repos'

render((
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<Route path="/repos" component={Repos}/>
			<Route path="/about" component={About}/>
		</Route>	
 	</Router>
	), document.getElementById('app'))
