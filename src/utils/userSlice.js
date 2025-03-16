import { createSlice, current } from '@reduxjs/toolkit';


// using slices to manage the state of the cart like adding, updating and deleting
// of items
const userSlice = createSlice({
    name: 'user',
    initialState : {
        userID : "100",
        username : 'Guest'
    },
    reducers : {
        loggedInUser : (state, action) => {
            state.userID = action.payload.userID,
            state.username = action.payload.username
            
        }
    }
})

export const { loggedInUser } = userSlice.actions;

export default userSlice.reducer;