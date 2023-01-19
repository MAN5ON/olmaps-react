import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


export const fetchRoutes = createAsyncThunk('routes/fetchRoutes', async () => {
    return axios
        .get("https://janti.ru:5381/Main/GetRoutes")
        .then(response => response.data)
})

const routeSlice = createSlice({
    name: 'route',
    initialState: {
        items: [],
        activeValue: 0,
        loading: false,
        error: '',

    },

    reducers: {
        changeActiveValue(state, action) {
            state.activeValue = action.payload
        }
    },

    extraReducers: builder => {
        builder.addCase(fetchRoutes.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchRoutes.fulfilled, (state, action) => {
            state.loading = false
            state.items = action.payload
            state.error = ''
        })
        builder.addCase(fetchRoutes.rejected, (state, action) => {
            state.loading = false
            state.items = []
            state.error = action.error.message
        })
    }
})
export const { changeActiveValue } = routeSlice.actions
export default routeSlice.reducer