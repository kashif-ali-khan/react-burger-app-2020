import React, { Component } from 'react';
import Button from './../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from './../../../axiosOrder';
import Loader from './../../../components/UI/Spinner/Spinner';
import Input from './../../../components/UI/Input/Input';
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
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
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
                value: ''
            }
        },
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
            ingredients: this.state.ingredients,
            price: this.state.totalCost,
            orderData: formData

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
                this.props.history.push("/orders");
            }).catch(error => {
                console.log(error);
                this.setState({
                    isLoading: false
                })
            })
    }
    inputChangeHandler = (event, identifier) => {
        const updatedContactForm = { ...this.state.orderForm };
        const updatedIdentifier = { ...updatedContactForm[identifier] };
        updatedIdentifier.value = event.target.value;
        updatedContactForm[identifier] = updatedIdentifier;
        this.setState({
            orderForm: updatedContactForm
        })
        //console.log(event.target.value)

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
        if (this.state.isLoading) {
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

export default ContactData;