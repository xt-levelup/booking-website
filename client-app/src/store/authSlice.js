import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    auth: localStorage.getItem("userData") ? true : false,
    userData: JSON.parse(localStorage.getItem("userData") || null),
};

const authSlice = createSlice({
    name: "authSlice",
    initialState: initialValue,
    reducers: {
        authUpdate(state, action) {
            state.auth = action.payload;
        },
        userDataUpdate(state, action) {
            state.userData = action.payload;
        },
    },
});

export const authSliceActions = authSlice.actions;
export default authSlice.reducer;
