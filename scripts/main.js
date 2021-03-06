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

//Firebase
var Rebase = require('re-base');
var base = Rebase.createClass('https://vitahealth.firebaseio.com/');

var Catalyst = require('react-catalyst');

//****************   App   *****************************************//

var App = React.createClass({
	mixins : [Catalyst.LinkedStateMixin],
	getInitialState : function() {
		return {
			products : {},
			cart : {}
		}
	},
	componentDidMount : function() {
		base.syncState('/products', {
			context: this,
			state: 'products'
		});

	var localStorageRef = localStorage.getItem('cart-');

	if(localStorageRef) {
		this.setState({
			cart : JSON.parse(localStorageRef)
		});
	   }
	},

	componentWillUpdate : function(nextProps, nextState) {
		localStorage.setItem('cart-' , JSON.stringify(nextState.cart));
	},
	addToOrder : function(key) {
		this.state.cart[key] = this.state.cart[key] + 1 || 1;
		this.setState({ cart : this.state.cart });
	},
	addProduct : function(product){
		var timestamp = (new Date()).getTime();
		//update the state
		this.state.products['product-' + timestamp] = product;
		//set the state
		this.setState({ products : this.state.products });
	},
	renderProduct : function(key){
		return <Product key={key} index={key} details={this.state.products[key]} addToOrder={this.addToOrder}/>
	},
	render : function() {
		return (
			<div>
				<ul>
					{Object.keys(this.state.products).map(this.renderProduct)}
				</ul>
				<Cart  products={this.state.products} cart={this.state.cart} />
				<Inventory addProduct={this.addProduct} products={this.state.products} linkState={this.linkState}/>
			</div>
		)
	}
});

//****************   Inventory App ************************************//


// var InventoryApp = React.createClass({
// 	getInitialState : function() {
// 		return {
// 			products : {},
// 			cart : {}
// 		}
// 	},
// 	componentDidMount : function() {
// 		base.syncState('/products', {
// 			context: this,
// 			state: 'products'
// 		});
// 	},
// 	addProduct : function(product){
// 		var timestamp = (new Date()).getTime();
// 		//update the state
// 		this.state.products['product-' + timestamp] = product;
// 		//set the state
// 		this.setState({ products : this.state.products });
// 	},
// 	renderProduct : function(key){
// 		return <Product key={key} index={key} details={this.state.products[key]} addToOrder={this.addToOrder}/>
// 	},
// 	render : function() {
// 		return (
// 			<div>
// 				<Inventory addProduct={this.addProduct} products={this.state.products} linkState={this.linkState}/>
// 			</div>
// 		)
// 	}
// });

//****************   Product   ****************************************//

var Product = React.createClass({
	onButtonClick : function() {
		console.log('Add the fish: ', this.props.index);
		var key = this.props.index;
		this.props.addToOrder(key);
	},
	render : function() {
		var details = this.props.details;
		return (
			<li>
				<p>{details.name}</p>
				<p>{helper.formatPrice(details.price)}</p>
				<p>{details.desc}</p>
				<button onClick={this.onButtonClick}>Add to Cart</button>
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
	renderOrder : function(key) {
		var product = this.props.products[key];
		var count = this.props.cart[key];

		return <li key={key}>
			{count}
			{product.name}
			{helper.formatPrice(count * product.price)}
		</li>
	},
	render : function() {
		var cartIds = Object.keys(this.props.cart);

		var total = cartIds.reduce((prevTotal, key)=> {
			var product = this.props.products[key];
			var count = this.props.cart[key];

			if(product) {
				return prevTotal + (count * parseInt(product.price) || 0);
			}
			return prevTotal;
		}, 0);
		return (
			<div>
				<h2>Shopping Cart</h2>
				<ul>
					{cartIds.map(this.renderOrder)}
					<li>Total: {helper.formatPrice(total)}</li>
				</ul>
			</div>
		)
	}
});

//****************   Inventory   *************************************//

var Inventory = React.createClass({
	renderInventory : function(key) {
		var linkState = this.props.linkState;
		return (
			<div key={key}>
				<input type="text" valueLink={linkState('products.'+ key +'.name' )} />
				<input type="text" valueLink={linkState('products.'+ key +'.price' )} />
				<textarea valueLink={linkState('products.'+ key +'.desc' )}></textarea>
				<button>Remove Product</button>
			</div>
		)
	},
	render : function() {
		return (
			<div>
				<h2>Inventory</h2>
				{Object.keys(this.props.products).map(this.renderInventory)}
				<AddProductForm {...this.props} />
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
		<Route path="/*" component={PageNotFound}/>
	</Router>
)

//****************   Render to Application   *************************//

ReactDOM.render(routes, document.querySelector('#main'));





