import React, { Component } from 'react';
import Button from './../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from './../../../axiosOrder';
import Loader from './../../../components/UI/Spinner/Spinner';
import Input from './../../../components/UI/Input/Input';
import { connect } from 'react-redux';

import { saveOrder } from './../../store/actions';
class ContactData extends Component {

    state = {
        ingredients: null,
        price: 0,
        isLoading: false,
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                validation: {
                    required: true
                },
                valid: false,
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                validation: {
                    required: true
                },
                valid: false,
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                validation: {
                    required: true
                },
                valid: false,
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                validation: {
                    required: true
                },
                valid: false,
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                validation: {
                    required: true
                },
                valid: false,
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                valid: true,
                validation: {},
                value: 'fastest'
            }
        },
        isFormValid: false
    }

    componentDidMount() {
        this.setState({
            ingredients: this.props.ingredients,
            totalCost: this.props.price
        })
    }
    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let item in this.state.orderForm) {
            formData[item] = this.state.orderForm[item].value
        }
        const orderData = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId

        }
        this.setState({
            isLoading: true
        });
        this.props.saveOrderHandler(orderData, this.props.token);
        // axios.post("orders.json", orderData)
        //     .then(response => {
        //         console.log(response)
        //         this.setState({
        //             isLoading: false
        //         })
        //         this.props.history.push("/orders");
        //     }).catch(error => {
        //         console.log(error);
        //         this.setState({
        //             isLoading: false
        //         })
        //     })
    }
    inputChangeHandler = (event, identifier) => {
        const updatedContactForm = { ...this.state.orderForm };
        const updatedIdentifier = { ...updatedContactForm[identifier] };
        updatedIdentifier.value = event.target.value;
        updatedContactForm[identifier] = updatedIdentifier;
        this.setState({
            orderForm: updatedContactForm
        })

    }
    render() {

        let elementArray = [];
        for (let element in this.state.orderForm) {
            elementArray.push({
                id: element,
                config: this.state.orderForm[element]
            })
        }
        let form = null;
        if (this.props.isLoading) {
            form = <Loader />;

        } else {

            //form =

            form = (
                <form onSubmit={this.orderHandler}>
                    {elementArray.map(formElement => {
                        return <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            changed={(event) => { this.inputChangeHandler(event, formElement.id) }}
                        />
                    })}
                    <Button btnType="Success">Order</Button>
                </form>
            )

            // form = (
            //     <form>
            //         <Input />
            //         {/* <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
            //         <input className={classes.Input} type="email" name="email" placeholder="Your Mail" />
            //         <input className={classes.Input} type="text" name="street" placeholder="Street" />
            //         <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" /> */}
            //         <Button btnType="Success" clicked={this.orderHandler}>Order</Button>

            //     </form>
            // )
        }
        return (
            <div className={classes.ContactData}>
                <h1>Contact Details</h1>
                {form}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        ings: state.burger.ingredients,
        price: state.burger.totalCost,
        isLoading: state.burger.isLoading,
        orderData: state.burger.orders,
        token: state.auth.idToken,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveOrderHandler: (orderData, token) => dispatch(saveOrder(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);