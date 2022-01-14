import * as actionTypes from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_CART:
            const item = action.payload;

            const existItem = state.cartItems.find(product => product.id === item.id);

            if (existItem) {
                return {
                    ...state, cartItems: state.cartItems.map(x => x.product === existItem.product ? existItem : x)
                }
            } else {
                let a = { ...state, cartItems: [...state.cartItems, item] }
                return a;
            }
        case actionTypes.REMOVE_FROM_CART:
            let s = {
                ...state, cartItems: state.cartItems.filter(product => product.id !== action.payload)
            }
            return s;

        case actionTypes.UPDATE_QUANTITY_IN_CART:
            const { id, quantity } = action.payload;
            const oldProductData = state.cartItems.find(product => product.id === id);
            oldProductData.quantity += quantity

            return {
                ...state, cartItems: state.cartItems.map(product => product.id === id ? oldProductData : product)
            }

        default:
            return state;
    }
}