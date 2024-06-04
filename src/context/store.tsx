import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { thunk } from "redux-thunk";

const rootReducer = combineReducers({
    user: userReducer,
});

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user"],
};

const reducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: reducer,
    //@ts-ignore
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    "persist/PERSIST",
                    "persist/REHYDRATE",
                    "persist/REGISTER",
                ],
                ignoredPaths: ["register"],
            },
            immutableCheck: false,
        }).concat(thunk);
    },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
