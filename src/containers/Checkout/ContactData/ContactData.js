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
                this.props.history.push("/orders");
            }).catch(error => {
                console.log(error);
                this.setState({
                    isLoading: false
                })
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
        if (this.state.isLoading) {
            form = <Loader />;

        } else {

            //form =

                form = (
                    <form>
                        {elementArray.map(formElement => {
                            return <Input
                                key={formElement.id}
                                elementType={formElement.config.elementType}
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value}
                            />
                        })}
                          <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
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