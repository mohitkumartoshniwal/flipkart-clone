import { Badge, Box, Button, makeStyles, Typography } from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons';
import React, { useContext, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LoginContext } from '../../context/ContextProvider.jsx';
import LoginDialog from '../Login/LoginDialog';
import Profile from './Profile';

const useStyle = makeStyles(theme => ({
    container: {
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            display: 'block'
        }
    },
    wrapper: {
        display: 'flex',    
        alignItems: 'center',
        '& > *': {
            marginRight: 50,
            textDecoration: 'none',
            color: '#FFFFFF',
            fontSize: 12,
            alignItems: 'center',
            [theme.breakpoints.down('sm')]: {
                color: '#2874f0',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                marginTop: 100,
                marginLeft:15,
                fontSize:25
            }      
        },
        [theme.breakpoints.down('sm')]: {
            display: 'block'
        }   
    },
    login: {
        color: '#2874f0',
        background: '#FFFFFF',
        textTransform: 'none',
        fontWeight: 600,
        borderRadius: 2,
        padding: '5px 40px',
        height: 32,
        boxShadow: 'none',
    },
    cart:{
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }   
    },
    cartText:{
        marginLeft:10,
        [theme.breakpoints.down('sm')]: {
            fontSize:25
        } 
    }
}));



const CustomButtons = ({account, setAccount, setOpenDialog}) => {
    const classes = useStyle();

    const cartDetails = useSelector(state => state.cart);
    const { cartItems } = cartDetails;

    return (
        <Box className={classes.wrapper}>
            {
                account ? <Profile account={account} setAccount={setAccount} /> :
                    <Button className={classes.login} variant="contained" onClick={() => setOpenDialog(true)}>Login</Button>
            }
            <Typography >More</Typography>
            <Link to='/cart' className={classes.container}>
                <Badge  className={classes.cart} badgeContent={cartItems?.length} color="primary">
                    <ShoppingCart />
                </Badge>
                <Typography className={classes.cartText} >Cart</Typography>
            </Link>
        </Box>
    )
}

export default CustomButtons
