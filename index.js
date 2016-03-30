import React from 'react'
import { Router, Route, hashHistory } from 'react-router'
import { render } from 'react-dom'
import App from './modules/App'
import About from './modules/About'
import Categories from './modules/Categories'

render((
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<Route path="/categories" component={Categories}/>
			<Route path="/about" component={About}/>
		</Route>	
 	</Router>
	), document.getElementById('app'))
