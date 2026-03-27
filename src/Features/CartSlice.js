import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: JSON.parse(localStorage.getItem("items")) || []
};

export const cartSlice = createSlice({
    name: "myCart",
    initialState,
    reducers: {
        // state -> current cart
        // action.payload -> the product that needs to be added
        addItem: (state,action) => {
            const product = action.payload;

            const existingProduct = state.items.find((item) => item.productId === product.productId);

            if(existingProduct){
                if(existingProduct.productQuantity < existingProduct.productInStock){
                    existingProduct.productQuantity += 1;
                }
            }
            else{
                state.items.push({...product , productQuantity: 1});
            }

            // saving the newly added product
            localStorage.setItem("items",JSON.stringify(state.items));
        },
        increaseQuantity: (state,action) => {
            const item = state.items.find((item) => item.productId === action.payload);

            if(item && item.productQuantity < item.productInStock){
                item.productQuantity += 1;
            }

            localStorage.setItem("items",JSON.stringify(state.items));
        },
        decreaseQuantity: (state,action) => {
            const item = state.items.find((item) => item.productId === action.payload);

            if(item){
                if(item.productQuantity > 1){
                    item.productQuantity -= 1;
                }
                else{
                    // remove if 0
                    state.items = state.items.filter((item) => item.productId !== action.payload); 
                }
            }

            localStorage.setItem("items",JSON.stringify(state.items));
        },
        removeItem: (state,action) => {
            state.items = state.items.filter((item) => item.productId !== action.payload);

            localStorage.setItem("items",JSON.stringify(state.items));
        }
    }
})

// Redux Toolkit automatically generates these two
//  Action creators are generated for each case reducer function
export const {addItem , increaseQuantity , decreaseQuantity , removeItem} = cartSlice.actions;

export default cartSlice.reducer// imported in store.js file