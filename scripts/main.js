var React = require('react');
var ReactDOM = require('react-dom');

//Load in the router
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Navigation = ReactRouter.Navigation;
var createBrowserHistory = require('history/lib/createBrowserHistory');

//Require Helpers
var helper = require('./helpers');

//****************   App   *****************************************//

var App = React.createClass({

	render : function() {
		return (
			<div>
				<Products />
			</div>
		)
	}
});

//****************   Products   ****************************************//

var Products = React.createClass({

	render : function() {
		return (
			<p>Products</p>
		)
	}
});

//****************   Cart   *******************************************//

var Cart = React.createClass({
	
	render : function() {
		return (
			<p>Cart</p>
		)
	}
});

//****************   Inventory   *************************************//

var Inventory = React.createClass({
	
	render : function() {
		return (
			<p>Inventory</p>
		)
	}
});

//****************   404 Page ****************************************//

var PageNotFound = React.createClass({

	render : function() {
		return (
			<p>Page Not Found</p>
		)
	}

});

//****************   Routes   ****************************************//

var routes = (
	<Router history={createBrowserHistory()}>
		<Route path="/" component={App}/>
		<Route path="/cart" component={Cart}/>
		<Route path="/inventory" component={Inventory}/>
		<Route path="/*" component={PageNotFound}/>
	</Router>
)

//****************   Render to Application   *************************//

ReactDOM.render(routes, document.querySelector('#main'));





