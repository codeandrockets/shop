import React from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { render } from 'react-dom'
import App from './modules/App'
import About from './modules/About'
import Categories from './modules/Categories'
import Vitamin from './modules/Vitamin'
import Home from './modules/Home'

render((
	<Router history={browserHistory}>
		<Route path="/" component={App}>
		<IndexRoute component={Home} />
			<Route path="/categories" component={Categories}>
				<Route path="/categories/:userName/:productName" component={Vitamin}/>
			</Route>
			<Route path="/about" component={About}/>
		</Route>	
 	</Router>
	), document.getElementById('app'))
