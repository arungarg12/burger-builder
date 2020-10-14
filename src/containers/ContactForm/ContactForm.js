import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import Classes from './ContactForm.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import { connect } from 'react-redux';
import * as ActionCreators from '../../store/actions/index';
import withErrorHandler from '../../hoc/withErrorHandling';
import Axios from '../../axiosInstance';

class ContactForm extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                label: 'Name',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name',
                    id: 'name'
                },
                value: '',
                validation: {
                    required: true
                },
                isValid: false,
                isTouched: false
            },
            email: {
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
            street: {
                elementType: 'input',
                label: 'street',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',
                    id: 'street',
                },
                value: '',
                validation: {
                    required: true
                },
                isValid: false,
                isTouched: false
            },
            postalCode: {
                elementType: 'input',
                label: 'Postal Code',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Postal Code',
                    id: 'postal',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                isValid: false,
                isTouched: false
            },
            country: {
                elementType: 'input',
                label: 'Country',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country',
                    id: 'country',
                },
                value: '',
                validation: {
                    required: true
                },
                isValid: false,
                isTouched: false
            },
            deliveryMethod: {
                elementType: 'select',
                label: 'Delivery Method',
                elementConfig: {
                    name: 'deliveryMethod',
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                config: {
                    name: 'deliveryMethod',
                    id: 'deliveryMethod',
                },
                value: 'fastest',
                isValid: true,
                validation: {}
            }
        },
        formIsValid: false,
    }

    OrderSubmitHandler = () => {
        let formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        const order = {
            burgerIngredients:this.props.burgerIngredients,
            price:this.props.totalPrice,
            orderData:formData
        }
        console.log('authToken=!=',this.props.authToken);
        this.props.BURGER_PURCHASE(order,this.props.authToken);
    }

    updateValueHandler = (event, element) => {
        const updatedOrderForm = { ...this.state.orderForm };
        const updatedFormElement = { ...updatedOrderForm[element] };
        updatedFormElement.value = event.target.value;
        updatedFormElement.isTouched = true;
        updatedFormElement.isValid = this.checkValidity(event.target.value, updatedFormElement.validation);
        let formIsValid = true;
        if (!updatedFormElement.isValid) {
            formIsValid = false;
        }
        updatedOrderForm[element] = updatedFormElement;
        console.log('formIsValid=',formIsValid)
        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
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

    render() {
        console.log('formIsValid=',this.state.formIsValid);
        let elementArray = [];
        for (let element in this.state.orderForm) {
            elementArray.push({
                id: element,
                config: this.state.orderForm[element]
            });
        }
        let form = (
            <form onSubmit={this.OrderSubmitHandler}>
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
                <Button btnType='Success' disabled={!this.state.formIsValid}>Order</Button>
            </form>);
            console.log('loading',this.props.loading);
        if (this.props.loading) {
            form = <Spinner />
        }
        return (
            <div className={Classes.ContactForm}>
                <h4>Enter yout Contact Data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        burgerIngredients: state.burgerBuilder.burgerIngredients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        authToken:state.authenticate.idToken
    };
}

const mapDispatchToProps = dispatch => {
    return{
        BURGER_PURCHASE:(order,authToken)=>dispatch(ActionCreators.burgerPurchase(order,authToken))   
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactForm,Axios));