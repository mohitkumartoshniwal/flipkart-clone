import { useState, useContext, useReducer, useEffect } from 'react';
import { Button, Box, makeStyles } from '@material-ui/core';
import { ShoppingCart as Cart, FlashOn as Flash } from '@material-ui/icons';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../context/ContextProvider';
import { addToCart } from '../../redux/actions/cartActions';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const useStyle = makeStyles(theme => ({
    leftContainer: {
        minWidth: '40%',
        // textAlign: 'center',
        padding: '40px 0 0 80px',
        [theme.breakpoints.down('md')]: {
            padding: '20px 40px',
        }

    },
    productImage: {
        padding: '15px 20px',
        border: '1px solid #f0f0f0',
        width: '95%'
    },
    button: {
        width: '46%',
        borderRadius: 2,
        height: 50,
        [theme.breakpoints.down('sm')]: {
            width: '100%',

        }
    },
    addToCart: {
        background: '#ff9f00',
        color: '#FFF',
        [theme.breakpoints.down('sm')]: {
            marginTop: 10,
        }
    },
    buyNow: {
        background: '#fb641b',
        color: '#FFF',
        [theme.breakpoints.down('sm')]: {
            marginTop: 10,

        }

    }
}));

const ActionItem = ({ product }) => {
    const classes = useStyle();
    const history = useNavigate();
    const { account } = useContext(LoginContext);
    const { id, price, detailUrl, title } = product;

    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();


    const buyNow = () => {
        history('/order', { state: { id } })
    }

    const addItemToCart = () => {
        dispatch(addToCart(id, quantity));
        history('/cart');
        if (account)
            toast.info("Item added to cart", {
                position: toast.POSITION.BOTTOM_CENTER
            });
    }

    return (
        <Box className={classes.leftContainer}>
            <img src={product.detailUrl} className={classes.productImage} alt="" /><br />
            <Button onClick={() => addItemToCart()} style={{ backgroundColor: '#ff9f00', color: 'white', marginRight: 10 }} className={clsx(classes.button, classes.addToCart)} variant="contained"><Cart />Add to Cart</Button>
            <Button onClick={() => { addItemToCart(); buyNow() }} style={{ backgroundColor: '#fb641b', color: 'white' }} className={clsx(classes.button, classes.buyNow)} variant="contained"><Flash /> Buy Now</Button>
        </Box>
    )
}

export default ActionItem;