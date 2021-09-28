import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const index = state.items.findIndex(
        (basketItem) => basketItem.id == action.payload.id
      );
      if (action.payload.quantity > 0) {
        if (index >= 0) {
          state.items[index].quantity += action.payload.quantity;
        } else {
          state.items = [...state.items, action.payload];
        }
      }
    },
    updateQuantity: (state, action) => {
      const index = state.items.findIndex(
        (basketItem) => basketItem.id == action.payload.id
      );

      if (index >= 0) {
        if (action.payload.quantity > 0) {
          state.items[index].quantity = action.payload.quantity;
          // console.log("quantity: " + state.items[index].quantity);
          // console.log(state.items);
        } else {
          let newBasket = [...state.items];
          newBasket.splice(index, 1);
          state.items = newBasket;
        }
      } else
        console.warn(
          `Can't remove product ${action.payload.id} as its does not exist!`
        );
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (basketItem) => basketItem.id === action.payload.id
      );

      let newBasket = [...state.items];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn("Can not remove");
      }

      state.items = newBasket;
    },
  },
});

export const { addToBasket, removeFromBasket, updateQuantity } =
  basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) =>
  state.basket.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

export const selectTotalItems = (state) =>
  state.basket.items.reduce((total, item) => total + item.quantity, 0);

export default basketSlice.reducer;
