import { createSlice } from "@reduxjs/toolkit";

const initialValue = { isHotelEdit: false, hotelEditData: null };

const isHotelEditSlice = createSlice({
    name: "isHotelEditSlice",
    initialState: initialValue,
    reducers: {
        isHotelEditUpdate(state, action) {
            state.isHotelEdit = action.payload;
        },
        hotelEditDataUpdate(state, action) {
            state.hotelEditData = action.payload;
        },
    },
});

export const isHotelEditSliceActions = isHotelEditSlice.actions;
export default isHotelEditSlice.reducer;
