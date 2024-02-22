import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getTransactionsSliceActions = createAsyncThunk(
    "getTransactionSlice/...Actions",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(
                "http://localhost:5000/post-admin-transactions",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        User: localStorage.getItem("userData"),
                    },
                    body: JSON.stringify({
                        userData: JSON.stringify(
                            localStorage.getItem("userData")
                        ),
                    }),
                }
            );
            const data = await response.json();
            if (!response.ok) {
                console.log(data && data.message);
                throw new Error(
                    data && data.message
                        ? data.message
                        : "Something went wrong!"
                );
            } else {
                return data;
            }
        } catch (err) {
            console.log("err:", err);
            console.log("err.message:", err.message);
            return rejectWithValue(err);
        }
    }
);

const getTransactionsSlice = createSlice({
    name: "getTransactionsSlice",
    initialState: {
        transactionData: null,
        transactionStatus: "idle",
        transactionErrorMessage: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTransactionsSliceActions.fulfilled, (state, action) => {
                // console.log("action:", action);
                state.transactionData = action.payload;
                state.transactionStatus = "succeeded!";
                state.transactionErrorMessage = null;
            })
            .addCase(getTransactionsSliceActions.pending, (state, action) => {
                state.transactionStatus = "loading!";
            })
            .addCase(getTransactionsSliceActions.rejected, (state, action) => {
                // console.log("action:", action);
                // console.log("action.error:", action.error);
                state.transactionData = null;
                state.transactionStatus = "failed!";
                state.transactionErrorMessage = action.payload.message;
            });
    },
});

export default getTransactionsSlice.reducer;
