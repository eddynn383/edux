import { createSlice } from '@reduxjs/toolkit';

export const navigationSlice = createSlice({
    name: 'navigation',
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {
        fetchNavigationStart: (state) => {
            state.loading = true;
        },
        fetchNavigationSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        },
        fetchNavigationError: (state, action) => {
            state.loading = false;
            state.data = null;
            state.error = action.payload;
        },
    },
});

export const { fetchNavigationStart, fetchNavigationSuccess, fetchNavigationError } = navigationSlice.actions;

export default navigationSlice.reducer;
