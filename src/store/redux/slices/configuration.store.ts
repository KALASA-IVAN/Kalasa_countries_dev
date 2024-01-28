import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '.'

type ConfigurationStore = {
    country: any;
    countries: Array<any>;
}

export const initialState: ConfigurationStore = {
    country: null,
    countries: []
}

const configurationSlice = createSlice({
    name: 'configuration',
    initialState,
    reducers: {
        setCountry: (state, action: PayloadAction<any>) => {
            state.country = action.payload
        },
        setCountries: (state, action: PayloadAction<Array<any>>) => {
            state.countries = action.payload
        },
    },
})

const { setCountry, setCountries } = configurationSlice.actions
export {
    setCountry,
    setCountries
}

export const configurationSelector = (state: RootState) => state.configuration;

const configurationReducer = configurationSlice.reducer
export default configurationReducer