import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Menu, MenuItem, makeStyles, Button } from '@material-ui/core';
import { PowerSettingsNew } from '@material-ui/icons';
import { toast } from 'react-toastify';


const useStyle = makeStyles({
    component: {
        marginTop: 40,
    },
    logout: {
        fontSize: 14,
        marginLeft: 20
    },
    logoutButton: {
        color: '#FFFFFF',
        textTransform: 'none',
        fontWeight: 600,
        borderRadius: 2,
        padding: '5px 40px',
        height: 32,
    },
})

const Profile = ({ setAccount }) => {
    const [open, setOpen] = useState(false);
    const classes = useStyle();

    const handleClick = (event) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const logout = () => {
        setAccount('');
        toast.success("Logout successful", {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    return (
        <>
            <Button className={classes.logoutButton} onClick={() => { logout(); }}>Logout</Button>
            {/* <Typography onClick={handleClick} style={{ marginTop: 2, cursor: 'pointer' }}>My Account</Typography>
            <Menu
                anchorEl={open}
                open={Boolean(open)}
                onClose={handleClose}
                className={classes.component}
            >
                <MenuItem onClick={() => { handleClose(); logout(); }}>
                    <PowerSettingsNew fontSize='small' color='primary' />
                    <Typography className={classes.logout}>Logout</Typography>
                </MenuItem>
            </Menu> */}
        </>
    )
}

export default Profile;