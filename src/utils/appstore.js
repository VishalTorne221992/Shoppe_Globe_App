import { configureStore } from '@reduxjs/toolkit'
import catalogReducer from './catalogSlice'
import cartReducer from './cartSlice'

// Create store for application
const appstore = configureStore({
    reducer : {
        catalog : catalogReducer,
        Cart : cartReducer
    }
})

export default appstore