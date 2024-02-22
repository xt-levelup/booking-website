import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRoomsData = createAsyncThunk(
    "getRoomsSlice/fetchRoomsData",
    async (_, rejectWithValue) => {
        try {
            const response = await fetch("http://localhost:5000/get-rooms");
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Cannot connect server!");
            } else {
                return data;
            }
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

const getRoomsSlice = createSlice({
    name: "getRoomsSlice",
    initialState: {
        roomData: null,
        roomStatus: "idle",
        errorRoomMessage: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRoomsData.fulfilled, (state, action) => {
                state.roomData = action.payload;
                state.roomStatus = "successfully";
                state.errorRoomMessage = null;
            })
            .addCase(fetchRoomsData.pending, (state, action) => {
                state.roomStatus = "loading";
            })
            .addCase(fetchRoomsData.rejected, (state, action) => {
                state.errorRoomMessage = action.payload;
                state.roomStatus = "failed";
                state.roomData = null;
            });
    },
});

export default getRoomsSlice.reducer;
