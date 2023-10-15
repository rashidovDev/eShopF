import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    user : {}, //User data
    isAuth : false
}

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        setUser: function(state, action){
            state.user = action.payload;
            state.isAuth = true;
        },
        logoutUser : function(state){
            state.user = null;
            state.auth = false
        }
    }
})

export const {setUser, logoutUser} = userSlice.actions;
export default userSlice.reducer;