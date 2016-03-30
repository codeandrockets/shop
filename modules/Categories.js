import React from 'react'
import { Link } from 'react-router'
import NavLink from './NavLink'

export default React.createClass({
	render() {
		return <div>
			<h2>Categories</h2>
			<ul>
				<li><NavLink to="/categories/reactjs/heynow">Vitamin A</NavLink></li>
          		<li><NavLink to="/categories/facebook/react">Vitamin B</NavLink></li>
			</ul>
			{this.props.children}
		</div>
	}
})