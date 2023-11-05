import { createSlice } from "@reduxjs/toolkit"

const basketSlice = createSlice({
    name: 'basket',
    initialState : {
        items: [],
        totalQuantity: 0,
        totalAmount: 0,
        basketIsVisible : false
    },
    reducers: {
        addItemToCart(state, action){
            const newItem = action.payload;
            const existingItem = state.items.find((item) => item.id === newItem._id || newItem.id)
            state.totalQuantity++
            if(!existingItem){
                      state.items.push({
                        id: newItem._id,
                        price: parseInt(newItem.price),
                        quantity: 1,
                        totalPrice:parseInt(newItem.price),
                        name : newItem.name,
                        image : newItem.image
                      })
            }else{
                existingItem.quantity++
                existingItem.totalPrice = existingItem.totalPrice + newItem.price
            }
            state.totalAmount = state.items.reduce(
                (total, item) => total + (item.price) * (item.quantity),0
              );
        },
        removeItemFromCart(state, action){
            const id = action.payload;
            const existingItem = state.items.find((item) => item.id === id);
            state.totalQuantity--;
            state.quantity--;
            state.changed = true
            if (existingItem.quantity === 1){
                state.items = state.items.filter((item) => item.id !== id)
            }else{
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price
            }
            state.totalAmount = state.items.reduce(
                (total, item) => total + (item.price)*(item.quantity),0
            );
        },
        deleteItem(state, action) {
            const id = action.payload;
            const existingItem = state.items.find((item) => item.id === id);
      
            if (existingItem) {
              state.items = state.items.filter((item) => item.id !== id);
              state.totalQuantity = state.totalQuantity - existingItem.quantity;
            }
      
            state.totalAmount = state.items.reduce(
              (total, item) => total + Number(item.price) * Number(item.quantity),
              0
            );
          },
          showBasket : function(state){
            state.basketIsVisible = !state.basketIsVisible
          }
    }
})


export const {addItemToCart, removeItemFromCart, deleteItem, showBasket} = basketSlice.actions;
export default basketSlice.reducer;