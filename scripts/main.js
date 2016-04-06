var React = require('react');
var ReactDOM = require('react-dom');

//****************   App   *************************//

var App = React.createClass({

	render : function() {
		return (
			<div>
				<Header />
				<Order />
				<Inventory />
			</div>
		)
	}
});

ReactDOM.render(<App />, document.querySelector('#main'));