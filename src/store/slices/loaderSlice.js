import {createSlice} from '@reduxjs/toolkit';

const initialState = {
     loader : false
}

const loaderSlice = createSlice({
    name : 'loader',
    initialState,
    reducers : {
        showLoader : function(state, action){
            state.loader = true
        },
        hideLoader : function(state){
            state.loader = false;
        }
    }
})

export const {showLoader, hideLoader} = loaderSlice.actions;
export default loaderSlice.reducer;