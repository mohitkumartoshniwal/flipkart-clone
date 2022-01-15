import { Box, Button, Dialog, DialogContent, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { authenticateLogin, authenticateSignup } from '../../service/api';
import { toast } from 'react-toastify';

const useStyle = makeStyles((theme) => ({
    component: {
        height: '70vh',
        width: '90vh',
        maxWidth: 'unset !important',
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        }
    },
    image: {
        backgroundImage: `url(${'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png'})`,
        background: '#2874f0',
        backgroundPosition: 'center 85%',
        backgroundRepeat: 'no-repeat',
        height: '70vh',
        width: '40%',
        padding: '45px 35px',
        '& > *': {
            color: '#FFFFFF',
            fontWeight: 600
        },
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    },
    login: {
        padding: '25px 35px',
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        '& > *': {
            marginTop: 20
        }
    },
    loginbtn: {
        textTransform: 'none',
        background: '#FB641B',
        color: '#fff',
        height: 48,
        borderRadius: 2
    },
    requestbtn: {
        textTransform: 'none',
        background: '#fff',
        color: '#2874f0',
        height: 48,
        borderRadius: 2,
        boxShadow: '0 2px 4px 0 rgb(0 0 0 / 20%)'
    },
    text: {
        color: '#878787',
        fontSize: 12
    },
    createText: {
        margin: 'auto 0 5px 0',
        textAlign: 'center',
        color: '#2874f0',
        fontWeight: 600,
        fontSize: 14,
        cursor: 'pointer',
        [theme.breakpoints.down('sm')]: {
            marginTop: 20,
        }
    },
    error: {
        fontSize: 10,
        color: '#ff6161',
        lineHeight: 0,
        marginTop: 10,
        fontWeight: 600
    }
}))

const loginInitialValues = {
    email: '',
    password: ''
};

const signupInitialValues = {
    email: '',
    password: '',
    phone: ''
};

const accountInitialValues = {
    login: {
        view: 'login',
        heading: 'Login',
        subHeading: 'Get access to your Orders, Wishlist and Recommendations'
    },
    signup: {
        view: 'signup',
        heading: "Looks like you're new here",
        subHeading: 'Signup to get started'
    }
}


const LoginDialog = ({ open, setOpen, setAccount }) => {
    const classes = useStyle();
    const [login, setLogin] = useState(loginInitialValues);
    const [signup, setSignup] = useState(signupInitialValues);
    const [account, toggleAccount] = useState(accountInitialValues.login);
    const [loginError, showLoginError] = useState(false);
    const [loginErrorMessage, setLoginErrorMessage] = useState('')
    const [signupError, showSignupError] = useState(false);
    const [signupErrorMessage, setSignupErrorMessage] = useState('')
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let phoneRegex=/^([+]\d{2})?\d{10}$/

    const loginNotification = () => {
        toast.success("Login successful", {
            position: toast.POSITION.TOP_RIGHT
        });
    };
    const signupNotification = () => {
        toast.success("Signup successful", {
            position: toast.POSITION.TOP_RIGHT
        });
    };

    // useEffect(() => {
    //     showError(false);
    // }, [login])

    const handleClose = () => {
        setOpen(false);
        toggleAccount(accountInitialValues.login);
        setLogin({ ...loginInitialValues })
        setSignup({ ...signupInitialValues })
    }

    const onLoginChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    const onSignUpChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }

    const loginUser = async () => {
        if (!login.email.match(regexEmail)) {
            setLoginErrorMessage("Please enter correct email address");
            showLoginError(true);
            return;
        }

        let response = await authenticateLogin(login);
        if (!response) {
            showLoginError(true);
            setLoginErrorMessage("Please enter valid credentials");

        }
        else {
            showLoginError(false);
            setLoginErrorMessage("");
            handleClose();
            setAccount(login.email);
            loginNotification()
        }
    }

    const signupUser = async () => {
        if (!signup.email.match(regexEmail)) {
            setSignupErrorMessage("Please enter correct email address");
            showSignupError(true);
            return;
        }

        if (!signup.password) {
            setSignupErrorMessage("Please enter password");
            showSignupError(true);
            return;
        }

        if (!signup.phone.match(phoneRegex)) {
            setSignupErrorMessage("Please enter correct phone number");
            showSignupError(true);
            return;
        }


        let response = await authenticateSignup(signup);
        if (!response) {
            setSignupErrorMessage("User already exists");
            return;
        }
        handleClose();
        setAccount(signup.email);
        signupNotification()
    }

    const toggleSignup = () => {
        setSignup({ ...signupInitialValues })
        toggleAccount(accountInitialValues.signup);
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogContent className={classes.component} >
                <Box style={{ display: 'flex' }}>
                    <Box className={classes.image}>
                        <Typography variant="h5">{account.heading}</Typography>
                        <Typography style={{ marginTop: 20 }}>{account.subHeading}</Typography>
                    </Box>
                    {
                        account.view === 'login' ?
                            <Box className={classes.login}>
                                <TextField type="email" onChange={(e) => onLoginChange(e)} name='email' label='Enter Email address' value={login.email} />
                                <TextField type="password" onChange={(e) => onLoginChange(e)} name='password' label='Enter Password' value={login.password} />
                                {loginError && <Typography className={classes.error}>{loginErrorMessage}</Typography>}
                                <Typography className={classes.text}>By continuing, you agree to Flipkart's Terms of Use and Privacy Policy.</Typography>
                                <Button className={classes.loginbtn} style={{ backgroundColor: '#fb641b', color: 'white' }} onClick={() => loginUser()} >Login</Button>
                                <Typography className={classes.createText} onClick={() => toggleSignup()}>New to Flipkart? Create an account</Typography>
                            </Box> :
                            <Box className={classes.login}>
                                <TextField type="email" onChange={(e) => onSignUpChange(e)} name='email' label='Enter Email' value={signup.email} />
                                <TextField type="password" onChange={(e) => onSignUpChange(e)} name='password' label='Enter Password' value={signup.password} />
                                <TextField onChange={(e) => onSignUpChange(e)} name='phone' label='Enter Phone' value={signup.phone} />
                                {signupError && <Typography className={classes.error}>{signupErrorMessage}</Typography>}
                                <Button className={classes.loginbtn} style={{ backgroundColor: '#fb641b', color: 'white' }} onClick={() => signupUser()} >Continue</Button>
                            </Box>
                    }
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default LoginDialog
