import React, { Component } from "react";
import Order from './../../components/Order/Order';
import axios from './../../axiosOrder';
import Loader from './../../components/UI/Spinner/Spinner';
class Orders extends Component {

    state = {
        orders: null
    }
    componentDidMount() {
        axios.get('/orders.json').then(response => {
            const orders = [];
            for (let item in response.data) {
                orders.push({
                    ...response.data[item],
                    id: item
                })
            }
            this.setState({
                orders: orders
            })
        })
    }
    render() {
        let OrderString = <Loader />
        if (this.state.orders) {
            OrderString = this.state.orders.map(order => (
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

export default Orders;