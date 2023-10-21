import {createSlice} from '@reduxjs/toolkit';

const initialState = {
     modal : false
}

const modalSlice = createSlice({
    name : 'modal',
    initialState,
    reducers : {
        showModal : function(state){
            state.modal = true
        },
        hideModal : function(state){
            state.modal = false;
        }
    }
})

export const {showModal, hideModal} = modalSlice.actions;
export default modalSlice.reducer;