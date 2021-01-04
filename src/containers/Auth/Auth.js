import { Component } from "react";
import Button from './../../components/UI/Button/Button';
import Input from './../../components/UI/Input/Input';
import classes from './Auth.css';
import { auth } from './../store/actions/auth';
import { connect } from 'react-redux';
import Spinner from './../../components/UI/Spinner/Spinner';
class Auth extends Component {
    state = {
        isSignUp: false,
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Enter Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        }
    }
    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }
    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({ controls: updatedControls });
    }
    onSubmitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(
            this.state.controls.email.value,
            this.state.controls.password.value,
            this.state.isSignUp
        )
    }
    switchSignup = () => {
        this.setState(prevState => {
            return { isSignUp: !prevState.isSignUp }
        })
    }
    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ))
        if(this.props.loading){
            form = <Spinner />;
        }

        let error = null;
        if(this.props.error){
            error = this.props.error;
        }

        return (
            <div className={classes.Auth}>
                {error}
                <form onSubmit={this.onSubmitHandler}>
                    {form}
                    <Button btnType="Success">Submit</Button>
                </form>
                <Button btnType="Success" clicked={this.switchSignup}>
                    {this.state.isSignUp?'Switch to sign in':'Switch to signup'}
                   </Button>
            </div>
        )
    }
}

const mappropsToState = state=>{
    return{
        loading:state.auth.loading,
        error:state.auth.error
    }
}
const mapPropsToDispatch = dispatch => {
    return {
        onAuth: (username, password, isSignUp) => dispatch(auth(username, password, isSignUp))
    }
}
export default connect(mappropsToState, mapPropsToDispatch)(Auth);