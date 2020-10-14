import React from 'react';
import classes from './Toolbar.css';
import Logo from '../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/drawerToggle/drawerToggle';

const toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <DrawerToggle drawerToggleClicked = {props.drawerToggleClicked} />
            <div><Logo height='80%'></Logo></div>
            <nav className={classes.DesktopOnly}><NavigationItems isAuthenticated={props.isAuthenticated}/></nav>
        </header>

    )
}

export default toolbar;