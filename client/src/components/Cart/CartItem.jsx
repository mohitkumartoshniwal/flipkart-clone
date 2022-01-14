import { Card, makeStyles, Box, Typography, Button } from '@material-ui/core';
import { addEllipsis } from '../../utils/util';
import clsx from 'clsx';
import GroupButton from './GroupButton';
import { fassured } from '../../data';

const useStyle = makeStyles((theme)=>({
    component: {
        borderTop: '1px solid #f0f0f0',
        borderRadius: 0,
        display: 'flex',
        [theme.breakpoints.down('md')]: {
            flexDirection:'column',
            textAlign:'center'
        }
    },
    leftComponent: {
        margin: 20,
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('md')]: {
            margin:'0 auto'
           }
    },
    image: {
        height: 110,
        width: 110,
        
    },
    mid: {
        margin: 20
    },
    greyTextColor: {
        color: '#878787'
    },
    smallText: {
        fontSize: 14,
    },
    price: {
        fontSize: 18,
        fontWeight: 600
    },
    remove: {
        marginTop: 20,
        fontSize: 16,
        fontWeight:700
    }
}))

const CartItem = ({ item, removeItemFromCart }) => {
    const classes = useStyle();

    return (
        <>
            {item && <Card className={classes.component}>
                <Box className={classes.leftComponent}>
                    <img src={item.url} className={classes.image} alt="" />
                    <GroupButton id={item.id} quantity={item.quantity} />
                </Box>
                <Box className={classes.mid}>
                    <Typography>{addEllipsis(item.title.longTitle)}</Typography>
                    <Typography className={clsx(classes.greyTextColor, classes.smallText)} style={{ marginTop: 10 }}>Seller:RetailNet
                        <span><img src={fassured} style={{ width: 50, marginLeft: 10 }} alt="" /></span>
                    </Typography>
                    <Typography style={{ margin: '20px 0' }}>
                        <span className={classes.price}>₹{item.price.cost}</span>&nbsp;&nbsp;&nbsp;
                        <span className={classes.greyTextColor}><strike>₹{item.price.mrp}</strike></span>&nbsp;&nbsp;&nbsp;
                        <span style={{ color: '#388E3C' }}>{item.price.discount} off</span>
                    </Typography>
                    <Button className={classes.remove} onClick={() => removeItemFromCart(item.id)}>Remove</Button>
                </Box>
            </Card>}
        </>

    )
}

export default CartItem;