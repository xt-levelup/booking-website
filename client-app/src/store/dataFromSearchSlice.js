import { createSlice } from "@reduxjs/toolkit";

const initialValue = { dataSearch: null };

const dataFromSearchSlice = createSlice({
    name: "dataFromSearchSlice",
    initialState: initialValue,
    reducers: {
        dataFromSearchUpdate(state, action) {
            state.dataSearch = action.payload;
        },
    },
});

export const dataFromSearchSliceActions = dataFromSearchSlice.actions;
export default dataFromSearchSlice.reducer;
