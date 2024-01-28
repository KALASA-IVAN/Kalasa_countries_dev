import { combineReducers } from '@reduxjs/toolkit'
import configurationReducer from './configuration.store'

const rootReducer = combineReducers({
    configuration: configurationReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer