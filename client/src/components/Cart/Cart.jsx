import { Box, makeStyles, Typography, Button, Grid } from '@material-ui/core';
import CartItem from './CartItem';
import { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux/actions/cartActions';
import TotalView from './TotalView';
import EmptyCart from './EmptyCart';
import Guest from './Guest';
import { useNavigate, useParams } from 'react-router-dom';
import { LoginContext } from '../../context/ContextProvider.jsx';
import { toast } from 'react-toastify';

const useStyle = makeStyles(theme => ({
    component: {
        // marginTop: 55,
        padding: '30px 135px',
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            padding: '15px 0'
        }
    },
    leftComponent: {
        // width: '67%',
        paddingRight: 15,
        [theme.breakpoints.down('sm')]: {
            marginBottom: 15
        }
    },
    header: {
        padding: '15px 24px',
        background: '#fff'
    },
    bottom: {
        padding: '16px 22px',
        background: '#fff',
        boxShadow: '0 -2px 10px 0 rgb(0 0 0 / 10%)',
        borderTop: '1px solid #f0f0f0'
    },
    placeOrder: {
        display: 'flex',
        marginLeft: 'auto',
        background: '#fb641b',
        color: '#fff',
        borderRadius: 2,
        width: 250,
        height: 51
    }
}));

const Cart = ({ match }) => {
    const classes = useStyle();

    const cartDetails = useSelector(state => state.cart);
    const { cartItems } = cartDetails;

    const dispatch = useDispatch();
    const { id } = useParams();
    const { account, setAccount } = useContext(LoginContext);
    const history = useNavigate()

    useEffect(() => {
        if (cartItems && id !== cartItems.id)
            dispatch(addToCart(id));
    }, [dispatch, cartItems, id]);

    // useEffect(() => {
    //     if(cartItems && match.params.id !== cartItems.id)   
    //         dispatch(addToCart(match.params.id));
    //     console.log(cartItems);
    // }, [dispatch, cartItems, match]);

    const removeItemFromCart = (id) => {
        dispatch(removeFromCart(id));
        toast.info("Item removed from cart", {
            position: toast.POSITION.BOTTOM_CENTER
        });
    }
    const buyNow = () => {
        history('/order')
    }
 
    return (
        <>
            {!account ? <Guest setAccount={setAccount} mainContent='Missing Cart items?' hint='Login to see the items you added previously' /> : cartItems.length ?
                <Grid container className={classes.component}>
                    <Grid item lg={9} md={9} sm={12} xs={12} className={classes.leftComponent}>
                        <Box className={classes.header}>
                            <Typography style={{ fontWeight: 600, fontSize: 18 }}>My Cart ({cartItems?.length})</Typography>
                        </Box>
                        {cartItems.map(item => (
                            <CartItem key={item.id} item={item} removeItemFromCart={removeItemFromCart} />
                        ))
                        }
                        <Box className={classes.bottom}>
                            <Button onClick={() => buyNow()} style={{ backgroundColor: '#fb641b', color: 'white' }} variant="contained" className={classes.placeOrder}>Place Order</Button>
                        </Box>
                    </Grid>
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                        <TotalView cartItems={cartItems} />
                    </Grid>
                </Grid> : <EmptyCart />
            }
        </>

    )
}

export default Cart;