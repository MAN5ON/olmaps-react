import { configureStore } from '@reduxjs/toolkit'
import routeReducer from './routeSlice'
import coordsReducer from './coordsSlice'

export default configureStore({
  reducer: {
    route: routeReducer,
    coords: coordsReducer
  }
})