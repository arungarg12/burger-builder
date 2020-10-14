import React from 'react';
import classes from './Backdrop.css';

const backdrop = (props) => {
    console.log('in backdrop',props.show);
   return props.show ? <div className={classes.Backdrop}
    onClick={props.clicked}
    ></div> :null
}

export default backdrop;