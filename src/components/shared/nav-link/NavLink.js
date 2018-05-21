import React from 'react';
import { Link } from 'react-router';

const NavLink = (props) => (
<Link
    {...props}
    activeClassName='active'>
    {props.children}
</Link>);

export default NavLink;