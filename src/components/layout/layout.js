import React, { Component } from 'react';
import Aux from '../../hoc/Auxilliary';
import classes from './layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux'

class Layout extends Component{
    state={
        showSideDrawer:false
    }
    sideDrawerShowHandler = () =>{
        this.setState({showSideDrawer:false})
    }
    drawerToggleClickHandler = () => {
        this.setState((prevState)=>{
          return {showSideDrawer : !prevState.showSideDrawer}
        })
    }
    render(){
        return(
            <Aux>
            <div>
                <Toolbar drawerToggleClicked={this.drawerToggleClickHandler}
                isAuthenticated={this.props.isAuthenticated}/>
                <SideDrawer closed={this.sideDrawerShowHandler} 
                open={this.state.showSideDrawer}/>
            </div>
            <main className={classes.Content}>
               {this.props.children}
            </main>
            </Aux>
        )
    }
} 

const mapStateToProps = state => {
    return{
        isAuthenticated : state.authenticate.idToken !==null
    }
}

export default connect(mapStateToProps)(Layout);