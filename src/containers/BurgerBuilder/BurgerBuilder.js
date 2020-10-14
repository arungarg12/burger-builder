import React, { Component } from 'react';
import Aux from '../../hoc/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
//import { BURGER_INGREDIENTS } from '../../Reusable/Constants';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Axios from '../../axiosInstance';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandling from '../../hoc/withErrorHandling';

import * as ActionCreators from '../../store/actions/index';
import { connect } from 'react-redux';

class BurgerBuilder extends Component {

    state = {
        ingredientCount: 0,
        orderSummaryDisplay: false
    }

    componentDidMount() {
     this.props.FETCH_INGREDIENT();
        /*  Axios.get('https://create-sim-burger.firebaseio.com/ingredients.json')
              .then(response => {
                  this.setState({ burgerIngredients: response.data });
                  console.log(this.state.burgerIngredients)
              })
              .catch(error => {
                  console.log('in json catch');
                  this.setState({ error: error });
              })*/

    }
    /*  onAddIngredientHandler = (type) => {
          // console.log('onAddIngredientHandler');
          const oldCount = this.state.burgerIngredients[type];
          const newCount = oldCount + 1;
          const updatedIngredients = { ...this.state.burgerIngredients };
          updatedIngredients[type] = newCount;
          const burgerIngFound = BURGER_INGREDIENTS.find(burIng => burIng.type === type);
          const updatedPrice = parseFloat(this.state.totalPrice) + parseFloat(burgerIngFound.price);
          this.setState({ burgerIngredients: updatedIngredients, totalPrice: parseFloat(updatedPrice).toFixed(2) });
          this.orderButtonDisabledHandler(updatedIngredients);
      }*/

    /*  onRemoveIngredientHandler = (type) => {
          //console.log('onRemoveIngredientHandler');
          let oldCount = this.state.burgerIngredients[type];
          let newCount = oldCount - 1;
          let updatedIngredients = { ...this.state.burgerIngredients };
          if (newCount >= 0) {
              updatedIngredients[type] = newCount;
              const burgerIngFound = BURGER_INGREDIENTS.find(burIng => burIng.type === type);
              const updatedPrice = this.state.totalPrice - parseFloat(burgerIngFound.price);
              this.setState({
                  burgerIngredients: updatedIngredients,
                  totalPrice: updatedPrice
              });
          }
          this.orderButtonDisabledHandler(updatedIngredients);
      }*/

    orderButtonDisabledHandler = (ingredients) => {
        console.log('orderButtonDisabledHandler');
        let sum = 0;
        //const ingredients = {...this.state.burgerIngredients};
        sum = (Object.keys(ingredients)
            .map((igKey) => ingredients[igKey]))
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        console.log('sum=', sum);
        return sum > 0;
    }

    orderSummaryDisplay = () => {
        if(this.props.isAuthenticated){
        this.setState({ orderSummaryDisplay: true });
        }
        else{
            this.props.history.push('/Authenticate');
        }
    }

    closeOrderSummaryHandler = () => {
        this.setState({ orderSummaryDisplay: false });
    }

    purchaseContinueHandler = () => {
        /*console.log(this.props);
         let burgerIng=[];
         for(let ingredient in this.state.burgerIngredients){
             burgerIng.push(encodeURIComponent(ingredient)+'='+encodeURIComponent(this.state.burgerIngredients[ingredient]));
         }
         burgerIng.push('totalPrice='+encodeURIComponent(this.state.totalPrice));
        let queryString =  burgerIng.join('&');
         this.props.history.push(
             {
                 pathname:'/checkout',
                 search:'?' + queryString
             }
         );*/
         this.props.INIT_PURCHASE();
        this.props.history.push('/checkout');
    }


    render() {

        let burger = this.props.error ? <p>{this.props.error.message}</p> : <Spinner />;
        let orderSummary = <Spinner />;
        if (this.props.burgerIngredients) {
            burger = <Aux>
                <Burger burgerIngredients={this.props.burgerIngredients} />
                <BuildControls buildControls={this.props.burgerIngredients}
                    burgerPrice={parseFloat(this.props.totalPrice).toFixed(2)}
                    onAddIngredient={this.props.ADD_INGREDIENT}
                    onRemoveIngredient={this.props.REMOVE_INGREDIENT}
                    purchasable={this.orderButtonDisabledHandler(this.props.burgerIngredients)}
                    orderSummaryDisplay={this.orderSummaryDisplay}
                    isAuthenticated = {this.props.isAuthenticated}
                />
            </Aux>;
            orderSummary = <OrderSummary burgerIngredients={this.props.burgerIngredients}
                closeOrderSummary={this.closeOrderSummaryHandler}
                purchaseContinueHandler={this.purchaseContinueHandler}
                burgerPrice={this.props.totalPrice} />;

        }

        return (
            <Aux>
                <Modal show={this.state.orderSummaryDisplay}
                    closeOrderSummary={this.closeOrderSummaryHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }

}

const mapStateToProps = state => {
    return {
        burgerIngredients: state.burgerBuilder.burgerIngredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.authenticate.idToken !==null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        FETCH_INGREDIENT: () => dispatch(ActionCreators.fetchIngredient()),
        ADD_INGREDIENT: (ingName) => dispatch(ActionCreators.addIngredient(ingName)),
        REMOVE_INGREDIENT: (ingName) => dispatch(ActionCreators.removeIngredient(ingName)),
        INIT_PURCHASE : () => dispatch(ActionCreators.burgerInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandling(BurgerBuilder, Axios));