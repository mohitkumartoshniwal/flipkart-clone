import { Box, makeStyles, Grid } from '@material-ui/core';
import clsx from 'clsx';
import { coronaURL, MidSectionImagesURL } from '../../data';

const useStyle = makeStyles(theme => ({
    wrapper: {
        display: 'flex',
        marginTop: 20,
        justifyContent: 'space-between'
    },
    image: {
        width: '100%'
    },
    help: {
        [theme.breakpoints.down('md')]: {
            objectFit: 'cover',
            height: 120
        }
    }
}));

const MidSection = () => {
    const classes = useStyle();
    return (
        <>
            <Grid  container className={classes.wrapper}>
                {
                    MidSectionImagesURL.map(image => (
                        <Grid item lg={4} md={4} sm={12} xs={12} key={image} >
                            <img src={image} className={classes.image} alt="" />
                        </Grid>
                    ))
                }
            </Grid>
            <img src={coronaURL} className={clsx(classes.wrapper, classes.help)} alt="" style={{width: '100%'}} />
        </>
    )
}

export default MidSection;