import React from 'react';
import Logo from '../../../assets/Images/burger-logo.png';
import classes from './Logo.css';

const logo = (props) => {
    return <img className={classes.Logo}
    style={{height:props.height}}
        src={Logo}
        alt='Logo' />
}

export default logo;