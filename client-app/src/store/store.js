import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./authSlice";
import getHotelsSlice from "./getHotelsSlice";
import getRoomsSlice from "./getRoomsSlice";
import searchValuesSlice from "./searchValuesSlice";
import dataFromSearchSlice from "./dataFromSearchSlice";

const store = configureStore({
    reducer: {
        authSlice: authSlice,
        getHotelsSlice: getHotelsSlice,
        getRoomsSlice: getRoomsSlice,
        searchValuesSlice: searchValuesSlice,
        dataFromSearchSlice: dataFromSearchSlice,
    },
});

export default store;
