import * as actionTypes from '../constants/cartConstants';
import axios from 'axios';

export const addToCart = (id, quantity) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(`/product/${id}`);

        dispatch({ type: actionTypes.ADD_TO_CART, payload: { ...data, quantity } });

    } catch (error) {
        console.log('Error while calling cart API');
    }
};

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: actionTypes.REMOVE_FROM_CART,
        payload: id
    })

};


export const updateItemInCart = (id, quantity) => (dispatch) => {

    dispatch({ type: actionTypes.UPDATE_QUANTITY_IN_CART, payload: { id, quantity } });


};
