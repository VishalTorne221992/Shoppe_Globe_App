import { createSlice, current } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'Cart',
    initialState : {
        items : [],
        Total_Price : 0
    },
    reducers : {
        addCartItem : (state, action) => {
            state.items.push(action.payload)
        },
        removeCartItem : (state, action) => {

        },
        updateTotalPrice : (state, action) => {
              state.Total_Price += action.payload;
        },
        updateQuantityIncrement : (state, action) => {
            
        },
        updateQuantityDecrement : (state, action) => {
            
        }
    }
})

export const { 
    addCartItem,  
    removeCartItem, 
    updateTotalPrice, 
    updateQuantityIncrement,
    updateQuantityDecrement
} = cartSlice.actions;

export default cartSlice.reducer;