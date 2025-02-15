import { createSlice, current } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'Cart',
    initialState : {
        items : [],
        Total_Price : 0
    },
    reducers : {
        addCartItem : (state, action) => {
            let localcart = [];
            localcart.push(action.payload);
            localStorage.setItem('cart',JSON.stringify(localcart))
            state.items.push(action.payload)
        },
        updateTotalPrice : (state, action) => {
              state.Total_Price += action.payload;
        },
        DecTotalPrice : (state, action) => {
            if(state.Total_Price > 0){
                state.Total_Price -= action.payload;
            }else{
                state.Total_Price = 0
            }
      },
        updateQuantityIncrement : (state, action) => {
            const index = state.items.findIndex(obj => obj.id === action.payload);
            state.items[index].quantity += 1;
        },
        updateQuantityDecrement : (state, action) => {
            const index = state.items.findIndex(obj => obj.id === action.payload);
            console.log('quantity',state.items[index].quantity)
            if(state.items[index].quantity > 1){
                state.items[index].quantity -= 1;
            }else{
                state.items = state.items.filter(item => {
                    if(item.id !== action.payload){
                        return item
                    }
                    return
                })
            }
            console.log(current(state))
        },
        DeleteItem : (state, action) => {

            state.items = state.items.filter(item => {
                if(item.id !== action.payload){
                    return item
                }
                return
            })

        }
    }
})

export const { 
    addCartItem,  
    updateTotalPrice, 
    DecTotalPrice,
    updateQuantityIncrement,
    updateQuantityDecrement,
    DeleteItem
} = cartSlice.actions;

export default cartSlice.reducer;