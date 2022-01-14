import React, { useState } from "react";
import { ButtonGroup, Button, makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { updateItemInCart } from "../../redux/actions/cartActions";
import { toast } from 'react-toastify';

const useStyle = makeStyles({
    component: {
        marginTop: 30
    },
    button: {
        borderRadius: '50%'
    }
})

const GroupedButton = ({ id, quantity }) => {
    const classes = useStyle();
    const [counter, setCounter] = useState(quantity);
    const dispatch = useDispatch();

    const handleIncrement = () => {
        setCounter(counter => counter + 1);
        dispatch(updateItemInCart(id, +1));
        toast.info("Item quantity increased in cart", {
            position: toast.POSITION.BOTTOM_CENTER
        });
    };

    const handleDecrement = () => {
        setCounter(counter => counter - 1);
        dispatch(updateItemInCart(id, -1));
        toast.info("Item quantity decreased in cart", {
            position: toast.POSITION.BOTTOM_CENTER
        });
    };

    return (
        <ButtonGroup className={classes.component} >
            <Button className={classes.button} onClick={() => handleDecrement()} disabled={counter === 1}>-</Button>
            <Button >{counter}</Button>
            <Button className={classes.button} onClick={() => handleIncrement()}>+</Button>
        </ButtonGroup>
    );
}

export default GroupedButton;