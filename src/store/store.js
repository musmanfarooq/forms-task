import { configureStore, createSlice } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { combineReducers } from 'redux';

const quizzesSlice = createSlice({
  name: 'quizzes',
  initialState: [],
  reducers: {
    addQuiz: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addQuiz } = quizzesSlice.actions;

const completedQuizzesSlice = createSlice({
  name: 'completedQuizzes',
  initialState: {},
  reducers: {
    completeQuiz: (state, action) => {
      const { quizId, score } = action.payload;
      state[quizId] = score;
    },
  },
});

export const { completeQuiz } = completedQuizzesSlice.actions;

const rootReducer = combineReducers({
  quizzes: quizzesSlice.reducer,
  completedQuizzes: completedQuizzesSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export default store;
