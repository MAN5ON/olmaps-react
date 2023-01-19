import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


export const fetchCoords = createAsyncThunk('coords/fetchCoords', async (id) => {
    return axios
        .get(`https://janti.ru:5381/Main/GetRouteData?id=${id}`)
        .then(response => response.data)
})

const coordsSlice = createSlice({
    name: 'coords',
    initialState: {
        items: [],
        isLoaded: false,
        error: ''
    },

    extraReducers: builder => {
        builder.addCase(fetchCoords.pending, state => {
            state.isLoaded = false
        })
        builder.addCase(fetchCoords.fulfilled, (state, action) => {
            state.isLoaded = true
            state.items = action.payload
            state.error = ''
        })
        builder.addCase(fetchCoords.rejected, (state, action) => {
            state.isLoaded = false
            state.items = []
            state.error = action.error.message
        })
    }
})

export default coordsSlice.reducer
