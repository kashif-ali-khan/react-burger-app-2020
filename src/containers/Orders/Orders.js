import React, { Component } from "react";
import Order from './../../components/Order/Order';
import axios from './../../axiosOrder';
import Loader from './../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import { fetchOrders } from './../store/actions';
class Orders extends Component {

    state = {
        orders: null
    }
    componentDidMount() {
        this.props.loadOrders();
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
        orders: state.fetchOrders
    }
}

const mapPropsToDispatch = dispatch => {
    return {
        loadOrders: () => dispatch(fetchOrders())
    }
}
export default connect(mapPropsToState, mapPropsToDispatch)(Orders);