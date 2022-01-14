import { makeStyles, Typography, Box, Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { emptycarturl } from '../../data';

const useStyle = makeStyles((theme) => ({
    component: {
        width: '80%',
        height: '65vh',
        background: '#fff',
        margin: '80px 140px',
        [theme.breakpoints.down('sm')]: {
            margin: '80px auto',
        }
    },
    image: {
        width: '15%',
        [theme.breakpoints.down('sm')]: {
            width: 150
        }
    },
    container: {
        textAlign: 'center',
        paddingTop: 70,
        '& > *': {
            marginTop: 10,
            fontSize: 14
        }
    },
    button: {
        background: '#2874f0',
        padding: '12px 70px',
        color: 'white',
        border: 2,
        marginTop: 12,
        [theme.breakpoints.down('sm')]: {
            padding: '8px 35px',
        },
        '&:hover':{
            background: '#2874f0', 
            color: 'white',
        }
    }
}))


const EmptyCart = () => {
    const classes = useStyle();
    const history = useNavigate()

    const addItems = () => {
        history('/')
    }
    return (
        <Box className={classes.component}>
            <Box className={classes.container}>
                <img src={emptycarturl} className={classes.image} alt="" />
                <Typography>Your cart is empty!</Typography>
                <Typography>Add items to it now.</Typography>
                <Button variant="contained" className={classes.button} onClick={() => addItems()}>Shop Now</Button>
            </Box>
        </Box>
    )
}

export default EmptyCart;