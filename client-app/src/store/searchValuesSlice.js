import { createSlice } from "@reduxjs/toolkit";

const initialValues = {
    city: "Where are you going?",
    startDate: new Date(),
    endDate: new Date(),
    adult: 0,
    children: 0,
    room: 0,
};

const searchValuesSlice = createSlice({
    name: "searchValuesSlice",
    initialState: initialValues,
    reducers: {
        cityUpdate(state, action) {
            state.city = action.payload;
        },
        startDateUpdate(state, action) {
            state.startDate = action.payload;
        },
        endDateUpdate(state, action) {
            state.endDate = action.payload;
        },
        adultUpdate(state, action) {
            state.adult = action.payload;
        },
        childrenUpdate(state, action) {
            state.children = action.payload;
        },
        roomUpdate(state, action) {
            state.room = action.payload;
        },
    },
});

export const searchValuesSliceActions = searchValuesSlice.actions;
export default searchValuesSlice.reducer;
