import React from "react";
import NavigationItem from './NavigationItem/NavigationItem';
import classes from "./NavigationItems.css";
import Aux from './../../../hoc/Auxilary';
const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>

        {
            props.isAuth
                ? (<Aux>
                    <NavigationItem link="/orders">Orders</NavigationItem>
                    <NavigationItem link="/logout">Logout</NavigationItem>
                </Aux>
                )
                : <NavigationItem link="/auth">Authentication</NavigationItem>
        }

    </ul>

)
export default navigationItems;
