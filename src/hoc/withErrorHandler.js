import React, { Component } from "react";
import Aux from './Auxilary';
import Modal from './../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }
        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({
                    error: null
                })
                return req;
            })
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({
                    error: error
                })
            })

        }
        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }
        errorClearHandler = () => {
            this.setState({
                error: null
            })

        }
        render() {
            return (
                <Aux>
                    <Modal show={this.state.error} clicked={this.errorClearHandler} >
                        {this.state.error?.message}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )

        }
    }

}

export default withErrorHandler;