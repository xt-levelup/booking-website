import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchHotelsActions = createAsyncThunk(
    "getHotels/fetchHotelsActions",
    async (_, rejectWithValue) => {
        try {
            const response = await fetch("http://localhost:5000/get-hotels");
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Cannot connect server!");
            } else {
                return data;
            }
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const getHotelsSlice = createSlice({
    name: "getHotelsSlice",
    initialState: {
        hotelData: null,
        status: "idle",
        errorMessage: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHotelsActions.fulfilled, (state, action) => {
                state.hotelData = action.payload;
                state.status = "successfully";
                state.errorMessage = null;
            })
            .addCase(fetchHotelsActions.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchHotelsActions.rejected, (state, action) => {
                state.status = "failed";
                state.errorMessage = action.payload;
                state.hotelData = null;
            });
    },
});

export default getHotelsSlice.reducer;
