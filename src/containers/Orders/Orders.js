import React, { useEffect } from "react";
import Order from './../../components/Order/Order';
import axios from './../../axiosOrder';
import Loader from './../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import { fetchOrders } from './../store/actions';
import withErrorHandler from './../../hoc/withErrorHandler';
const Orders = (props) => {

    //const [orders, orderStateUpdate] = useState([]);

    useEffect(() => {
        props.loadOrders(props.token, props.userId);
    }, [])

    let OrderString = <Loader />;
    if (props.orders) {
        OrderString = props.orders.map(order => (
            <Order key={order.id}
                ingredients={order.ingredients}
                price={order.price}
            />))

    }

    return OrderString;

}

const mapPropsToState = state => {
    return {
        orders: state.burger.fetchOrders,
        token: state.auth.idToken,
        userId: state.auth.userId
    }
}

const mapPropsToDispatch = dispatch => {
    return {
        loadOrders: (token, userid) => dispatch(fetchOrders(token, userid))
    }
}
export default connect(mapPropsToState, mapPropsToDispatch)(withErrorHandler(Orders, axios));