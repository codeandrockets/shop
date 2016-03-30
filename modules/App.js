import React from 'react'
import { Link } from 'react-router'
import NavLink from './NavLink'

export default React.createClass({
  render() {
    return <div>
    	<h1>Vitalife</h1>
    	<ul>
            <li><NavLink to="/" onlyActiveOnIndex={true}>Home</NavLink></li>
    		<li><NavLink to="/about" activeClassName="active">About</NavLink></li>
    		<li><NavLink to="/categories" activeClassName="active">Categories</NavLink></li>
    	</ul>

    	{this.props.children || <Home/>}

    </div>
  }
})
