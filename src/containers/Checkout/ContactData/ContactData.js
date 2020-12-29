import React, { Component } from 'react';
import Button from './../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from './../../../axiosOrder';

class ContactData extends Component {

    state = {
        ingredients: null,
        price: 0,
        isLoading: false
    }

    componentDidMount() {
        this.setState({
            ingredients: this.props.ingredients,
            totalCost: this.props.price
        })
    }
    orderHandler = (event) => {
        event.preventDefault();

        // this.props.history.push({
        //     pathname: "/checkout",
        //     search: queryParams.join("&")
        // });
        const orderData = {
            ingredients: this.state.ingredients,
            price: this.state.totalCost,
            customer: {
                name: 'Kashif ali khan',
                address: {
                    street: 'Test stree',
                    zipCode: '201009',
                    country: 'Dubai'
                },
                email: 'kashif.7373@gmail.com'
            },
            deliveryMethod: 'fastest'
        }
        this.setState({
            isLoading: true
        });
        axios.post("orders.json", orderData)
            .then(response => {
                console.log(response)
                this.setState({
                    isLoading: false
                })
            }).catch(error => {
                console.log(error);
                this.setState({
                    isLoading: false
                })
            })
        alert('continue')
    }
    render() {
        console.log(this.props.ingredients)
        console.log(this.props)

        return (
            <div className={classes.ContactData}>
                <h1>Contact Details</h1>
                <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                <input className={classes.Input} type="email" name="email" placeholder="Your Mail" />
                <input className={classes.Input} type="text" name="street" placeholder="Street" />
                <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
                    <Button btnType="Success" clicked={this.orderHandler}>Order</Button>

                </form>
            </div>
        )
    }
}

export default ContactData;