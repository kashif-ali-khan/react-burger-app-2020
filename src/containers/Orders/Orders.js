import React, { Component } from "react";
import Order from './../../components/Order/Order';
import axios from './../../axiosOrder';
import Loader from './../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import { fetchOrders } from './../store/actions';
import withErrorHandler from './../../hoc/withErrorHandler';
class Orders extends Component {

    state = {
        orders: null
    }
    componentDidMount() {
        this.props.loadOrders(this.props.token);
        // axios.get('/orders.json').then(response => {
        //     const orders = [];
        //     for (let item in response.data) {
        //         orders.push({
        //             ...response.data[item],
        //             id: item
        //         })
        //     }
        //     this.setState({
        //         orders: orders
        //     })
        // })
    }
    render() {
        let OrderString = <Loader />
        if (this.props.orders) {
            OrderString = this.props.orders.map(order => (
                <Order key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}
                />))

        }
        return (
            OrderString
        )
    }

}

const mapPropsToState = state => {
    return {
        orders: state.burger.fetchOrders,
        token:state.auth.idToken
    }
}

const mapPropsToDispatch = dispatch => {
    return {
        loadOrders: (token) => dispatch(fetchOrders(token))
    }
}
export default connect(mapPropsToState, mapPropsToDispatch)(withErrorHandler(Orders,axios));