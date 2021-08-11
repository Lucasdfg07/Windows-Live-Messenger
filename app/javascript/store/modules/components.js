import { createSlice } from '@reduxjs/toolkit'

export const componentSlice = createSlice({
  name: 'component',
  initialState: {
    sign_in: false,
    sign_up : false
  },
  reducers: {
    sign_in_screen_state: (state) => {
        state.sign_in = true
        state.sign_up = false
    },
    sign_up_screen_state: (state) => {
        state.sign_up = true
        state.sign_in = false
    },
    close_components_state: (state) => {
      state.sign_in = false
      state.sign_up = false
    }
  },
})

// Action creators are generated for each case reducer function
export const { sign_in_screen_state, sign_up_screen_state, close_components_state } = componentSlice.actions

export default componentSlice.reducer