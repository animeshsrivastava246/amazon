import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	products: [],
	productsNumber: 0,
};
export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action) => {
			const addProductExists = state.products.find(
				(product) => product.id === action.payload.id
			);
			if (addProductExists) {
				addProductExists.quantity += parseInt(action.payload.quantity);
			} else {
				state.products.push({
					...action.payload,
					quantity: parseInt(action.payload.quantity),
				});
			}
			state.productsNumber += parseInt(action.payload.quantity);
		},
		removeFromCart: (state, action) => {
			const productToRemove = state.products.find(
				(product) => product.id === action.payload
			); //find the product removing the array
			state.productsNumber = state.productsNumber - productToRemove.quantity; //remove the quantity from product number
			const ind = state.products.findIndex(
				(product) => product.id === action.payload
			); //find the index of the product removing
			state.products.splice(ind, 1); //remove from the array
		},
		incrementInCart: (state, action) => {
			const itemInc = state.products.find((item) => item.id === action.payload);
			if (itemInc.quantity >= 1) {
				itemInc.quantity += 1;
			}
			state.productsNumber += 1;
		},
		decrementInCart: (state, action) => {
			const itemDec = state.products.find((item) => item.id === action.payload);
			if (itemDec.quantity === 1) {
				const index = state.products.findIndex(
					(item) => item.id === action.payload
				);
				state.products.splice(index, 1);
			} else {
				itemDec.quantity--;
			}
			state.productsNumber -= 1;
		},
	},
});

export const { addToCart, removeFromCart, decrementInCart, incrementInCart } =
	cartSlice.actions;
export default cartSlice.reducer;
