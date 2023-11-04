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
            localStorage.removeItem("admin_access_token")
            localStorage.removeItem("admin_user")
            localStorage.removeItem("admin_tokenTime")
        }
    }
})

export const {setUser, logoutUser} = userSlice.actions;
export default userSlice.reducer;