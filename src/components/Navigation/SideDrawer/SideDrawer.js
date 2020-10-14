import React from 'react';
import Logo from '../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxilliary';

const SideDrawer = (props) => {

    console.log('props.open====',props.open)
    let attachedClasses = [classes.SideDrawer,classes.Close];
    if(props.open){
        attachedClasses = [classes.SideDrawer,classes.Open];
    }

    return(
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}></Backdrop>
        <div className={attachedClasses.join(' ')}>
            <Logo style={{'margin-bottom':'32%'}} height='11%'/>
            <nav>
                <NavigationItems />
            </nav>
        </div>
        </Aux>
    )

}

export default SideDrawer;