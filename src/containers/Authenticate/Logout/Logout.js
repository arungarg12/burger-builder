import React,{Component} from 'react';
import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

class Logout extends Component{
    componentDidMount(){
        this.props.OnLogout();
    }
    render(){
        return(
            <Redirect to='/'/>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return{
        OnLogout:() => dispatch(actions.authenticationLogout())
    }
}

export default connect(null,mapDispatchToProps)(Logout);