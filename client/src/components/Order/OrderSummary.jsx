import { Box, Button, Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../../redux/actions/cartActions';
import CartItem from '../Cart/CartItem'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const useStyle = makeStyles((theme) => ({
    component: {
        margin: '0 auto'
    }
}))

const OrderSummary = ({ handleNext, id }) => {
    const classes = useStyle();

    const cartDetails = useSelector(state => state.cart);
    const { cartItems } = cartDetails;
    const dispatch = useDispatch();
    const history = useNavigate()


    const removeItemFromCart = (itemId) => {
        dispatch(removeFromCart(itemId));
        toast.info("Item removed from cart", {
            position: toast.POSITION.BOTTOM_CENTER
        });
        if (id || cartItems.length === 0) {
            history("/")
        }
    }
    return (
        <>
            {id ? <CartItem item={cartItems.find(item => item.id === id)} removeItemFromCart={removeItemFromCart} />
                : <Box className={classes.component}>
                    <Grid container >
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            {cartItems.map(item => (
                                <CartItem key={item.id} item={item} removeItemFromCart={removeItemFromCart} />
                            ))
                            }

                        </Grid>
                    </Grid>

                </Box>
            }
            <Button
                variant="contained"
                onClick={handleNext}
                style={{ backgroundColor: '#fb641b', marginTop: '12px', color: 'white' }}
            // className={classes.button}
            >
                CONTINUE
            </Button>
        </>
    )
}

export default OrderSummary
