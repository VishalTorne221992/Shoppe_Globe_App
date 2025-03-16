import { configureStore } from '@reduxjs/toolkit'
import catalogReducer from './catalogSlice'
import cartReducer from './cartSlice'
import userReducer from './userSlice'

// Create store for application
const appstore = configureStore({
    reducer : {
        catalog : catalogReducer,
        Cart : cartReducer,
        userInfo : userReducer
    }
})

export default appstore