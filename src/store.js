import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import authReducer from "./features/auth/authSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";

const authPersistConfig = {
  key: "auth",
  storage,
  // whitelist: ["token", "user", "isAuthenticated"],
};

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: persistReducer(authPersistConfig, authReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/REGISTER",
        ],
      },
    }).concat(apiSlice.middleware),
});

store.subscribe(() => {
  const state = store.getState();
  const isAuthenticated = state.auth.isAuthenticated;
  const token = state.auth.token;

  if (!isAuthenticated && !token) {
    sessionStorage.clear();
  }
});

export const persistor = persistStore(store);
