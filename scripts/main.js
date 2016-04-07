var React = require('react');
var ReactDOM = require('react-dom');

//Load in the router
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Navigation = ReactRouter.Navigation;

var History = ReactRouter.History;
var createBrowserHistory = require('history/lib/createBrowserHistory');

//Require Helpers
var helper = require('./helpers');

//****************   App   *****************************************//

var App = React.createClass({
	getInitialState : function() {
		return {
			products : {},
			order : {}
		}
	},
	addProduct : function(product){
		var timestamp = (new Date()).getTime();
		//update the state
		this.state.products['product-' + timestamp] = product;
		//set the state
		this.setState({ products : this.state.products });
	},
	renderProduct : function(key){
		return <Product key={key} index={key} details={this.state.products[key]} />
	},
	render : function() {
		return (
			<div>
				<ul>
					{Object.keys(this.state.products).map(this.renderProduct)}
				</ul>
				<Cart />
				<Inventory addProduct={this.addProduct} />
			</div>
		)
	}
});

//****************   Product   ****************************************//

var Product = React.createClass({
	render : function() {
		var details = this.props.details;
		console.log(details);
		return (
			<li>
				<p>{details.name}</p>
				<p>{details.price}</p>
				<p>{details.desc}</p>
			</li>
		)
	}
});

//****************   Add Products Form   *******************************//

var AddProductForm = React.createClass({
	addProduct : function(event) {
		event.preventDefault();
		//Take the data from the form and create an object
		var product = {
			name : this.refs.name.value,
			price : this.refs.price.value,
			desc : this.refs.desc.value
		}
		//Add product to the app state
		this.props.addProduct(product);
		this.refs.productForm.reset();
	},
	render : function() {
		return (
			<form ref="productForm" onSubmit={this.addProduct}>
				<input type="text" ref="name" placeholder="Product Name" />
				<input type="text" ref="price" placeholder="Price" />
				<textarea type="text" ref="desc" placeholder="Product Description"></textarea>
				<button type="submit">+ Add Item </button>
			</form>
		)
	}
})

//****************   Cart   ********************************************//

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
			<div>
				<h2>Inventory</h2>
				<AddProductForm {...this.props}/>
			</div>
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





