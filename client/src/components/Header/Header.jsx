import { AppBar, Box, Drawer, IconButton, List, ListItem, Toolbar, Typography, withStyles } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { logoURL, subURL } from '../../data'
import CustomButtons from './CustomButtons'
import SearchBar from './SearchBar'
import { Menu } from '@material-ui/icons';
import LoginDialog from '../Login/LoginDialog'
import { LoginContext } from '../../context/ContextProvider'

const useStyle = makeStyles((theme) => ({
    header: {
        background: theme.custom.palette.header.background,
        height: '55px'
    },
    component: {
        marginLeft: '12%',
        lineHeight: 0,
        color: '#FFFFFF',
        textDecoration: 'none',
        [theme.breakpoints.down('sm')]: {
            marginLeft: '1%',
        }
    },
    logo: {
        width: '75px'
    },
    container: {
        display: 'flex',
    },
    subHeading: {
        fontSize: '10px',
        fontStyle: 'italic'
    },
    subURL: {
        width: '10px',
        height: '10px',
        marginLeft: '4px'
    },
    list: {
        width: '250px',
        height: '100%'
    },
    menuButton: {
        display: 'none',
        [theme.breakpoints.down('sm')]: {
            display: 'block'
        }
    },
    customButtons: {
        margin: '0 5% 0 auto',
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    }
}))

//overridding muitheme locally
const ToolBar = withStyles({
    root: {
        minHeight: '55px'
    }
})(Toolbar)

const Header = () => {
    const classes = useStyle();

    const [open, setOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const { account, setAccount } = useContext(LoginContext);

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const list = () => (
        <Box className={classes.list} onClick={handleClose}>
            <List>
                <ListItem button>
                    <CustomButtons setOpenDialog={setOpenDialog} account={account} setAccount={setAccount}/>
                </ListItem>
            </List>
        </Box>
    );


    return (
        <AppBar className={classes.header}>
            <ToolBar >
                <IconButton
                    color="inherit"
                    className={classes.menuButton}
                    onClick={handleOpen}
                >
                    <Menu />
                </IconButton>

                <Drawer open={open} onClose={handleClose}>
                    {list()}
                </Drawer>
                <Link to='/' className={classes.component}>
                    <img src={logoURL} className={classes.logo} alt="logo" />
                    <Box className={classes.container}>
                        <Typography className={classes.subHeading}>Explore <Box component="span" style={{ color: '#FFE500' }}>Plus</Box></Typography>
                        <img src={subURL} className={classes.subURL} alt="logo" />
                    </Box>

                </Link>
                <SearchBar />
                <span className={classes.customButtons}><CustomButtons setOpenDialog={setOpenDialog} account={account} setAccount={setAccount} /></span>
            </ToolBar>
            <LoginDialog open={openDialog} setOpen={setOpenDialog} setAccount={setAccount} />
        </AppBar>
    )
}

export default Header
