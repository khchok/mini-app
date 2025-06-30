import { combineReducers, configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter-slice';
// import type { RootState } from "./types";
import themeReducer from './theme-slice';
import usersReducer from './users-slice';
import uiReducer from './ui-slice';
import logger from '@/middleware/logger';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const rootReducer = combineReducers({
  counter: counterReducer,
  users: usersReducer,
  ui: uiReducer,
  theme: themeReducer
});
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['theme'] // only persist these
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});

const persistor = persistStore(store);

export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<typeof rootReducer>;

export { persistor, store };
