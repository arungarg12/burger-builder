import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import Classes from './Authenticate.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import { connect } from 'react-redux';
import * as ActionCreators from '../../store/actions/index';
import withErrorHandler from '../../hoc/withErrorHandling';
import Axios from '../../axiosInstance';
import { Redirect } from 'react-router-dom';

class Authenticate extends Component {
    state = {
        authenticationForm: {
            userName: {
                elementType: 'input',
                label: 'Email',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Id',
                    id: 'email'
                },
                value: '',
                validation: {
                    required: true
                },
                isValid: false,
                isTouched: false
            },
            password: {
                elementType: 'input',
                label: 'Password',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                    id: 'password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                isValid: false,
                isTouched: false
            }
        },
        isSignUp: true
    }

    AuthenticationSubmitHandler = (event) => {
        event.preventDefault();
        let formData = {};
        for (let formElementIdentifier in this.state.authenticationForm) {
            formData[formElementIdentifier] = this.state.authenticationForm[formElementIdentifier].value;
        }
        this.props.ON_AUTHENTICATE(formData,this.state.isSignUp);
    }

    updateValueHandler = (event, element) => {
        const updatedAuthenticationForm = { ...this.state.authenticationForm };
        const updatedFormElement = { ...updatedAuthenticationForm[element] };
        updatedFormElement.value = event.target.value;
        updatedFormElement.isTouched = true;
        updatedFormElement.isValid = this.checkValidity(event.target.value, updatedFormElement.validation);
        updatedAuthenticationForm[element] = updatedFormElement;
        this.setState({ authenticationForm: updatedAuthenticationForm });
    }


    checkValidity = (targetValue, rules) => {
        let isValid = true;
        if (rules.required && isValid) {
            isValid = targetValue.trim(' ') !== '';
        }

        if (rules.minLength && isValid) {
            isValid = targetValue.length >= rules.minLength;
        }

        if (rules.maxLength && isValid) {
            isValid = targetValue.length <= rules.maxLength;
        }
        return isValid;
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSignUp: !prevState.isSignUp }
        })
    }

    render() {
        let elementArray = [];
        for (let element in this.state.authenticationForm) {
            elementArray.push({
                id: element,
                config: this.state.authenticationForm[element]
            });
        }

        let form = (
            <form onSubmit={this.AuthenticationSubmitHandler}>
                {elementArray.map(element => {
                    return (<Input
                        key={element.id}
                        label={element.config.label}
                        elementConfig={element.config.elementConfig}
                        elementType={element.config.elementType}
                        value={element.config.value}
                        inValid={!element.config.isValid}
                        isTouched={element.config.isTouched}
                        shouldValidate={element.config.validation}
                        updateValue={(event) => this.updateValueHandler(event, element.id)}
                    />
                    )
                })}
                <Button btnType='Success' >SUBMIT</Button>
            </form>);
        if (this.props.loading) {
            form = <Spinner />
        }
        let errorMsg = '';
        console.log('errorMsg=', this.props.error)
        if(this.props.error){
             errorMsg=<div style={{color:'red'}}>{this.props.error.message}</div>
        }
        let redirect = null;
        if(this.props.isAuthenticated){
            if(this.props.burgerIngredients){
                redirect = <Redirect to='/checkout' />
            }
            else{
            redirect = <Redirect to='/'/>
            }
        }
        return (
            <div className={Classes.Authenticate}>
                <h4>Enter yout Authentication Data</h4>
                {errorMsg}
                {form}
                <Button btnType='Danger'
                    onClick={this.switchAuthModeHandler}>
                    Switch to {this.state.isSignUp ? 'SignIn' : 'SignUp'}
                </Button>
                {redirect}
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        // authenticationData: state.authentication.authenticationForm,
        loading: state.authenticate.loading,
        error: state.authenticate.error,
        isAuthenticated: state.authenticate.idToken !==null,
        burgerIngredients: state.burgerBuilder.burgerIngredients
    };
}

const mapDispatchToProps = dispatch => {
    return {
        ON_AUTHENTICATE: (userData,isSignUp) => dispatch(ActionCreators.authenticate(userData,isSignUp))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Authenticate, Axios));