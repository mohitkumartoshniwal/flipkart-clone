import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Box, FormControl, FormControlLabel, FormLabel, makeStyles, Radio, RadioGroup } from '@material-ui/core';
import clsx from 'clsx';

const validationSchema = yup.object({
    name: yup.string().required('Name is required'),
    mobile: yup.string()
        .required("This field is Required")
        .matches(
            /^([+]\d{2})?\d{10}$/,
            "Phone number is not valid"
        ),
    pincode: yup.string()
        .required("Pincode is required")
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(6, 'Must be exactly 6 digits')
        .max(6, 'Must be exactly 6 digits'),
    locality: yup.string().required('Locality is required'),
    address: yup.string().required('Address is required'),
    residence: yup.string().required('This field is required'),
    state: yup.string().required('State is required'),
});


const useStyles = makeStyles((theme) => ({
    flex: {
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: '1rem',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column'
        }
    },
    addressType: {
        width: '80%',
        margin: '1rem auto 0 auto',
        '& > *': {
            marginTop: '1rem',
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            margin: '1rem 0 0 0',
        }
    },
    address: {
        width: '80%',
        [theme.breakpoints.down('md')]: {
            width: '100%'
        }
    }

}))
const Delivery = ({ handleNext, form, setForm }) => {

    const classes = useStyles()
    const formik = useFormik({
        initialValues: form,
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            handleNext()
            setForm(values)

        },
    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <Box className={classes.flex}>
                    <TextField
                        id="name"
                        name="name"
                        label="Name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                    <TextField

                        id="mobile"
                        name="mobile"
                        label="10-digit mobile number"
                        type="number"
                        value={formik.values.mobile}
                        onChange={formik.handleChange}
                        error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                        helperText={formik.touched.mobile && formik.errors.mobile}
                    />
                </Box>
                <Box className={classes.flex}>
                    <TextField
                        id="pincode"
                        name="pincode"
                        label="Pincode"
                        value={formik.values.pincode}
                        onChange={formik.handleChange}
                        error={formik.touched.pincode && Boolean(formik.errors.pincode)}
                        helperText={formik.touched.pincode && formik.errors.pincode}
                    />
                    <TextField

                        id="locality"
                        name="locality"
                        label="Locality"
                        value={formik.values.locality}
                        onChange={formik.handleChange}
                        error={formik.touched.locality && Boolean(formik.errors.locality)}
                        helperText={formik.touched.locality && formik.errors.locality}
                    />
                </Box>
                <Box className={classes.flex}>
                    <TextField
                        className={classes.address}
                        id="address"
                        name="address"
                        label="Address (Area and Street)"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        error={formik.touched.address && Boolean(formik.errors.address)}
                        helperText={formik.touched.address && formik.errors.address}
                    />

                </Box>
                <Box className={classes.flex}>
                    <TextField
                        id="residence"
                        name="residence"
                        label="City/District/Town"
                        value={formik.values.residence}
                        onChange={formik.handleChange}
                        error={formik.touched.residence && Boolean(formik.errors.residence)}
                        helperText={formik.touched.residence && formik.errors.residence}
                    />
                    <TextField
                        id="state"
                        name="state"
                        label="State"
                        value={formik.values.state}
                        onChange={formik.handleChange}
                        error={formik.touched.state && Boolean(formik.errors.state)}
                        helperText={formik.touched.state && formik.errors.state}
                    />
                </Box>
                <Box className={classes.flex}>
                    <TextField
                        id="landmark"
                        name="landmark"
                        label="Landmark (Optional)"
                        value={formik.values.landmark}
                        onChange={formik.handleChange}
                        error={formik.touched.landmark && Boolean(formik.errors.landmark)}
                        helperText={formik.touched.landmark && formik.errors.landmark}
                    />
                    <TextField

                        id="altMobile"
                        name="altMobile"
                        type='number'
                        label="Alternate Phone (Optional)"
                        value={formik.values.altMobile}
                        onChange={formik.handleChange}
                        error={formik.touched.altMobile && Boolean(formik.errors.altMobile)}
                        helperText={formik.touched.altMobile && formik.errors.altMobile}
                    />
                </Box>
                <FormControl className={clsx(classes.flex, classes.addressType)} component="fieldset">
                    <FormLabel component="legend">Address Type</FormLabel>
                    <RadioGroup
                        row
                        name="addressType"
                        value={formik.values.addressType}
                        onChange={formik.handleChange}
                    >
                        <FormControlLabel value="home" control={<Radio />} label="Home (All day delivery)" />
                        <FormControlLabel value="work" control={<Radio />} label="Work (Delivery between 10 AM - 5 PM)" />
                    </RadioGroup>
                </FormControl>

                <Button style={{ backgroundColor: '#fb641b', color: 'white', marginTop: 20 }} variant="contained" type="submit">
                    DELIVER HERE
                </Button>
            </form>
        </div>
    );
};

export default Delivery
