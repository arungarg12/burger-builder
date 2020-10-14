import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link='/' >Build Burger</NavigationItem>
    {props.isAuthenticated ? <NavigationItem link='/my-orders'>My Orders</NavigationItem>:null}
    {!props.isAuthenticated ?
      <NavigationItem link='/authenticate'>Authenticate</NavigationItem>
      : <NavigationItem link='/logout'>Logout</NavigationItem>}
  </ul>

)

export default navigationItems;


