import React, { Component } from "react";

const asyncComponent = (importComponent) => {
    return class extends Component {
        state = {
            component: null
        }
        componentDidMount() {
            importComponent()
                .then(response => {
                    this.setState({ cmp: response.default })
                })

        }
        render() {
            const C = this.state.cmp;
            return C ? <C {...this.props} /> : null

        }
    }

}

export default asyncComponent;