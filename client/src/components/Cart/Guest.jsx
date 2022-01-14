import { makeStyles, Typography, Box, Button } from '@material-ui/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { emptycarturl } from '../../data';
import LoginDialog from '../Login/LoginDialog';

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
        background: '#fb641b',
        padding: '12px 70px',
        color: 'white',
        border: 2,
        marginTop: 12,
        [theme.breakpoints.down('sm')]: {
            padding: '8px 35px',
        }
    }
}))


const Guest = ({ setAccount, mainContent, hint }) => {
    const classes = useStyle();
    const history = useNavigate()
    const [open, setOpen] = useState(false)


    return (
        <>
            <Box className={classes.component}>
                <Box className={classes.container}>
                    <img src={emptycarturl} className={classes.image} alt="" />
                    {mainContent && <Typography>{mainContent}</Typography>}
                    <Typography>{hint}</Typography>
                    <Button variant="contained" style={{ backgroundColor: '#fb641b', color: 'white' }} className={classes.button} onClick={() => setOpen(true)}>Login</Button>
                </Box>
            </Box>
            <LoginDialog open={open} setOpen={setOpen} setAccount={setAccount} />
        </>

    )
}

export default Guest;