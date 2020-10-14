import React from 'react';
import Layout from '../components/layout/layout';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import Checkout from './Checkout/Checkout';
import { Route, Switch } from 'react-router-dom';
import MyOrders from '../containers/MyOrders/MyOrders';
import Authenticate from './Authenticate/Authenticate';
import Logout from './Authenticate/Logout/Logout';


function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path='/checkout' component={Checkout}></Route>
          <Route path="/my-orders" component={MyOrders} />
          <Route path="/authenticate" component={Authenticate} />
          <Route path="/logout" component={Logout} />
          <Route path='/' component={BurgerBuilder}></Route>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
