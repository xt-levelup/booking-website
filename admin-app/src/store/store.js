import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import getTransactionsSlice from "./getTransactionsSlice";
import isHotelEditSlice from "./isHotelEditSlice";
import isRoomEditSlice from "./isRoomEditSlice";

const store = configureStore({
    reducer: {
        authSlice: authSlice,
        getTransactionsSlice: getTransactionsSlice,
        isHotelEditSlice: isHotelEditSlice,
        isRoomEditSlice: isRoomEditSlice,
    },
});

export default store;
