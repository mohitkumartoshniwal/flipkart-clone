import Carousel from 'react-material-ui-carousel'
import { makeStyles } from '@material-ui/core'
import { bannerData } from '../../data';


const useStyle = makeStyles(theme => ({
    image: {
        width: '100%',
        height: 280,
        [theme.breakpoints.down('sm')]:{
            objectFit:'cover',
            height: 180
        }
    },
    carousel:{
        marginTop:20
    }
}))


const Banner = () => {
    const classes = useStyle();
    return (
        <Carousel
            autoPlay={true}
            animation="slide"
            indicators={false}
            navButtonsAlwaysVisible={true}
            cycleNavigation={true}
            className={classes.carousel}
            navButtonsProps={{
                style: {
                    color: '#494949',
                    backgroundColor: '#FFFFFF',
                    borderRadius: 0,
                    margin: 0,
                    width: 50,
                }
            }}
        >
            {
                bannerData.map(image => (
                    <img key={image} src={image} className={classes.image} alt="" />
                ))
            }
        </Carousel>
    )
}

export default Banner
