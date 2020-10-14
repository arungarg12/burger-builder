import React, { Component } from 'react';
import Aux from './Auxilliary';
import Modal from '../components/UI/Modal/Modal';

const withErrorHandling = (WrappedComponent,axios) => {
   return class abc extends Component {
            state={
                error:null
            }
        componentWillMount(){
           this.reqInterceptor = axios.interceptors.request.use(req=> {
                this.setState({error:null});
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res,error => {
                this.setState({error:error});
            });
            
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error:null});
        }

        render(){
            return(
                <Aux>
                    <Modal show={this.state.error}
                        closeOrderSummary={this.errorConfirmedHandler}>
                            erroroor
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />

 
                </Aux>
            )
        }
    }
}

export default withErrorHandling;