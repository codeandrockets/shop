import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  render() {
    return <div>
    	<h1>Vitalife</h1>
    	<ul>
    		<li><Link to="/about" activeClassName="active">About</Link></li>
    		<li><Link to="/categories" activeClassName="active">Categories</Link></li>
    	</ul>

    	{this.props.children}

    </div>
  }
})
