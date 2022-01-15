import { Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { payUsingPaytm } from '../../service/api';
import { post } from '../../utils/paytm';
import axios from 'axios';


const Payment = ({ cartItems, account, id }) => {
    const [totalCost, setTotalCost] = useState(0);

    useEffect(() => {
        const totalAmount = () => {
            if (id) {
                const item = cartItems.find(item => item.id === id)
                setTotalCost(item.price - item.discount + 40)
            } else {
                let price = 0, discount = 0;
                cartItems.forEach(item => {
                    price += item.price.mrp * item.quantity
                    discount += (item.price.mrp - item.price.cost) * item.quantity
                })
                setTotalCost(price - discount + 40)

            }
        }
        totalAmount();
    }, [cartItems, id]);

    const payNow = async () => {
        let response = await payUsingPaytm({ amount: totalCost, email: account.email });
        var information = {
            action: 'https://securegw-stage.paytm.in/order/process',
            params: response
        }
        post(information);
    }

    return (
        <div>
            <Button variant="contained" onClick={() => payNow()} style={{ marginTop: 12, backgroundColor: '#fb641b', color: 'white' }}>Pay using Paytm</Button>
        </div>
    )
}

export default Payment
