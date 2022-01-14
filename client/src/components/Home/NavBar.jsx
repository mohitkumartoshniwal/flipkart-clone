import { Box, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { navData } from '../../data'


const useStyle = makeStyles(theme => ({
    component: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '55px 130px 0 130px',
        overflowX: 'overlay',
        [theme.breakpoints.down("md")]: {
            margin: 0
        }
    },
    container: {
        padding: '12px 8px',
        textAlign: 'center'
    },
    image: {
        width: 64
    },
    text: {
        fontSize: 14,
        fontWeight: 600,
        fontFamily: 'inherit'
    }
}));

const NavBar = () => {
    const classes = useStyle()
    return (
        <Box className={classes.component}>
            {
                navData.map((category) => (
                    <Box className={classes.container} key={category.url}>
                        <img className={classes.image} src={category.url} alt={category.text} />
                        <Typography className={classes.text}>{category.text}</Typography>
                    </Box>
                ))
            }
        </Box>
    )
}

export default NavBar