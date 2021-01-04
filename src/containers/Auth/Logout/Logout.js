import { Component } from "react";
import { Redirect } from "react-router";
import { connect } from 'react-redux';
import { logout } from './../../store/actions/auth';
class Logout extends Component {
    componentDidMount() {
        this.props.onLogOut();
    }
    render() {
        return (
            <Redirect to="/" />
        )
    }
}

const mapPropsToDispatch = dispatch => {
    return {
        onLogOut: () => dispatch(logout())
    }
}
export default connect(null, mapPropsToDispatch)(Logout);