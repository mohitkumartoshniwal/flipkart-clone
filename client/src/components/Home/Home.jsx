import { Box, makeStyles } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Banner from './Banner'
import MidSection from './MidSection'
import MidSlider from './MidSlider'
import NavBar from './NavBar'
import Slider from './Slider'
import { getProducts as productsApiCall } from '../../redux/actions/productActions.js'

const useStyle = makeStyles({
    component: {
        padding: 10,
        background: '#F2F2F2'
    }
})

const Home = () => {
    const classes = useStyle();

    const { products } = useSelector(state => state.getProducts)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(productsApiCall())
    }, [dispatch]) // why dispatch needed as dependency??????????//

    return (
        <>
            <NavBar />
            <Box className={classes.component}>
                <Banner />
                <MidSlider products={products} />
                <MidSection  />
                <Slider
                    products={products}
                    title='Discounts for You'
                    timer={false}
                />
                <Slider
                    products={products}
                    title='Suggested Items'
                    timer={false}
                />
                <Slider
                    products={products}
                    title='Top Selection'
                    timer={false}
                />
                <Slider
                    products={products}
                    title='Recommended Items'
                    timer={false}
                />
            </Box>
        </>

    )
}

export default Home
