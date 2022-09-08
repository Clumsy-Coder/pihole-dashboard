import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';

import apiSlice from '@redux/apiSlice';

/**
 * Redux store.
 * contains reducer for Redux Toolkit Query
 */
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

/**
 * Typescript type of the entire redux state
 */
export type AppState = ReturnType<typeof store.getState>;
/**
 * Typescript type of the entire redux dispatch commands
 */
export type AppDispatch = typeof store.dispatch;

/**
 * Redux useDispatch React Function Component hook with Typescript type definitions of Redux store
 *
 * @example
 * ```javascript
 * import { useAppDispatch } from "@redux/store"
 * import { fetchSession } from "@redux/Session"
 *
 * const component = () => {
 *    const dispatch = useAppDispatch()
 *    useEffect(() => {
 *      dispatch(fetchSession());
 *    }, [dispatch]);
 *
 *    return (<div>my content</div>)
 * }
 * ```
 */
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export default store;
