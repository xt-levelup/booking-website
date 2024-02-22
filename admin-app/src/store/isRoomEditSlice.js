import { createSlice } from "@reduxjs/toolkit";

const initialValue = { isRoomEdit: false, roomEditData: null };

const isRoomEditSlice = createSlice({
    name: "isRoomEditSlice",
    initialState: initialValue,
    reducers: {
        isRoomEditUpdate(state, action) {
            state.isRoomEdit = action.payload;
        },
        roomEditDataUpdate(state, action) {
            state.roomEditData = action.payload;
        },
    },
});

export const isRoomEditSliceActions = isRoomEditSlice.actions;
export default isRoomEditSlice.reducer;
