import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from '../utils/cartUtils';

const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : { cartItems: [] };

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;

            const existingItem = state.cartItems.find((t) => t._id === item._id);

            if (existingItem) {
                // state.cartItems = state.cartItems.map(x => x._id === existingItem._id ? (
                //     { ...item, qty: item.qty + existingItem.qty }
                // ) : x)
                state.cartItems = state.cartItems.map((x) =>
                    x._id === existingItem._id ? item : x
                );
            } else {
                state.cartItems = [...state.cartItems, item];
            }
            
            // updating cart in the localStorage
            return updateCart(state);
        },
        removeFromCart: (state, action)=>{
            state.cartItems = state.cartItems.filter((item)=>item._id !== action.payload);
            
            // updating cart in the localStorage
            return updateCart(state);
        }
    },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;