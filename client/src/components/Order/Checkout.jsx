import { Box, Button, Typography } from '@material-ui/core'
import React from 'react'

const Checkout = ({ account, handleNext }) => {
    return (
        <Box>
            <Typography>{account}</Typography>
            <Button
                variant="contained"
                style={{ backgroundColor: '#fb641b', color: 'white', marginTop:12 }}
                onClick={handleNext}          
            // className={classes.button}
            >
                CONTINUE CHECKOUT
            </Button>
        </Box>
    )
}

export default Checkout
