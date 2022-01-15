import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TotalView from '../Cart/TotalView';
import { useSelector } from 'react-redux';
import { Box, Grid } from '@material-ui/core';
import Delivery from './Delivery';
import OrderSummary from './OrderSummary';
import Checkout from './Checkout';
import Guest from '../Cart/Guest';
import { LoginContext } from '../../context/ContextProvider.jsx';
import Payment from './Payment';
import { useLocation } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    component: {
        // marginTop: 55,
        display: 'flex',
        justifyContent: 'center',
        padding: '30px 135px',
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
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),

    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
    header: {
        '& > *': {
            '& > *': {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',

            },
        }
    },
    activeStep: {
        background: '#2874f0',
        padding:'.5rem',
        '& > span':{
            color:'white'
        }
    },
    changeButton: {
        display: 'none'
    },
    total: {
        width: '30%',
        margin: '12px 0 0 12px'
    }
}));

function getSteps() {
    return ['LOGIN', 'DELIVERY ADDRESS', 'ORDER SUMMARY', 'PAYMENT OPTIONS'];
}

const PlaceOrder = () => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(1);
    const steps = getSteps();
    const cartDetails = useSelector(state => state.cart);
    const { cartItems } = cartDetails;
    const { account, setAccount } = useContext(LoginContext);
    const { state } = useLocation();
    const [form, setForm] = useState({
        name: '',
        mobile: '',
        pincode: '',
        locality: '',
        address: '',
        residence: '',
        state: '',
        landmark: '',
        altMobile: '',
        addressType: 'home'
    })


    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleChange = (index) => {
        setActiveStep(index)
    }

    const customComponent = (index) => {
        switch (index) {
            case 0:
                return <Checkout account={account} handleNext={handleNext} />
            case 1:
                return <Delivery form={form} setForm={setForm} handleNext={handleNext} />
            case 2:
                return <OrderSummary id={state?.id} handleNext={handleNext} />
            case 3:
                return <Payment account={account} id={state?.id} cartItems={cartItems}/>
            default:
        }

    }

    return (
        <>
            {!account ? <Guest setAccount={setAccount} hint='Login to place order' /> :
                <Grid container className={classes.component}>
                    <Grid item lg={7} md={9} sm={12} xs={12} className={classes.leftComponent}>
                        <Stepper activeStep={activeStep} orientation="vertical" color="#2874f0">
                            {steps.map((label, index) => (
                                <Step key={label}>
                                    <StepLabel className={activeStep === index ? classes.activeStep : classes.header}>
                                        <Typography component={'span'} >{label}</Typography>
                                        <Button className={index >= activeStep ? classes.changeButton : ''} color="primary" variant="outlined" onClick={() => handleChange(index)}>CHANGE</Button>
                                    </StepLabel>
                                    <StepContent>
                                        {
                                            customComponent(index)
                                        }
                                    </StepContent>
                                </Step>
                            ))}
                        </Stepper>
                        {activeStep === steps.length && (
                            <Paper square elevation={0} className={classes.resetContainer}>
                                <Typography>All steps completed - you&apos;re finished</Typography>
                                <Button onClick={handleReset} className={classes.button}>
                                    Reset
                                </Button>
                            </Paper>
                        )}
                    </Grid>
                    <Grid item lg={5} md={3} sm={12} xs={12}>
                        {/* <Box className={classes.total}> */}
                        <TotalView cartItems={cartItems} />
                        {/* </Box> */}
                    </Grid>
                </Grid>
            }
        </>
    );
}

export default PlaceOrder
